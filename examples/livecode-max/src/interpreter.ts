inlets = 1
outlets = 0

var p = this.patcher

type ObjectWrapper = {
	id: string
	type: string
	patcher: string
	obj: Maxobj
	name?: string
}

var objects: ObjectWrapper[] = [];
function has(id: string, objects: ObjectWrapper[]): ObjectWrapper | undefined {
	const fromObj = objects.find(x => x.id === id);
	if (fromObj === undefined) {
		error("fromId: " + id + " does not exist");
		return;
	}
	return fromObj;
}

function n(type: string, posX?: number, posY?: number, args?: any[]) {

	if (type === 'patcher') {
		var timestamp = new Date().getTime();
		var subpatcherName = "subpatcher_" + timestamp;
		const existing = objects.filter(x => x.type === type);
		const nobj = {
			id: type + existing.length.toString(),
			type: type,
			obj: p.newdefault(posX || 0, posY || 0, "p", subpatcherName, ...args || []),
			patcher: p.name,
			name: subpatcherName
		}
		objects.push(nobj);
		p = nobj.obj.subpatcher(0);
		p.locked = true;
		return;
	}
	if (type === 'bang') {
		type = 'button'
	}
	const existing = objects.filter(x => x.type === type);
	if (!Array.isArray(args))
		args = [args]
	const nobj = {
		id: type + existing.length.toString(),
		type: type,
		obj: p.newdefault(posX || 20, posY || 40, type, ...args || []),
		patcher: p.name
	}
	objects.push(nobj);

}

function c(fromId: string, fromPort: number, toId: string, toPort: number) {
	const fromObj = has(fromId, objects);
	const toObj = has(toId, objects);
	p.connect(fromObj?.obj, fromPort, toObj?.obj, toPort);
}

function d(fromId: string, fromPort: number, toId: string, toPort: number) {
	const fromObj = has(fromId, objects);
	const toObj = has(toId, objects);
	p.disconnect(fromObj?.obj, fromPort, toObj?.obj, toPort);
}

function rm(this: any, id: string) {
	const obj = has(id, objects);
	const idx = objects.findIndex(x => x.id === id);
	objects.splice(idx, 1);
	if (obj?.type === "patcher") {
		// although max will clean up the child objects itself we also need to do some
		// housekeeping when something is removed so it's easiest to handle by finding
		// what's in the patcher we are destroying and deleting all the children
		let child = objects.findIndex(x => x.patcher === obj.name)
		while (child !== -1) {
			rm(objects[child].id)
			child = objects.findIndex(x => x.patcher === obj.name)
		}
		p = (<any>this).patcher
	}
	p.remove(obj?.obj);
}

function m() {
	var a = arrayfromargs(arguments);
	const obj = has(a.shift(), objects);
	obj?.obj.message(a.shift(), ...a)
}

function ls() {
	objects.forEach(element => {
		post(element.id + "   " + element.type + "   " + element.patcher + "   " + element.name + "\n")
	});
}


Array.prototype.findIndex = function (callback, thisArg) {
	if (!callback || typeof callback !== 'function') throw TypeError();
	const size = this.length;
	const that = thisArg || this;
	for (var i = 0; i < size; i++) {
		try {
			if (!!callback.apply(that, [this[i], i, this])) {
				return i;
			}
		} catch (e) {
			return -1;
		}
	}
	return -1;
}