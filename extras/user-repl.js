function overviewCustomFunction(k, ctx) {
    //This does not make a huge amount of sense to do, but none the less it is possible!
    const line = ctx.tb.getLine(0)
    const regex = /have been replayed through the alphanumeric handler/g;
    var newStr = line.replace(regex, 'will be lost in time, like tears in rain...');
    ctx.tb.setLine(0, newStr)
    //when we also return something from custom handler
    //it will be output from the repl as a message
    return [newStr];
};

glrepl.manager.kp.preloadFunction('deckardsDream', overviewCustomFunction);