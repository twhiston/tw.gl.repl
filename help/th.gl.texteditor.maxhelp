{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 8,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 100.0, 99.0, 861.0, 639.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "",
		"showrootpatcherontab" : 0,
		"showontab" : 0,
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 8,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 0.0, 26.0, 861.0, 613.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"showontab" : 1,
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-80",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 743.0, 467.0, 86.0, 22.0 ],
									"text" : "routepass size"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-79",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 715.0, 398.0, 47.0, 22.0 ],
									"text" : "getsize"
								}

							}
, 							{
								"box" : 								{
									"attr" : "visible",
									"id" : "obj-77",
									"maxclass" : "attrui",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 540.0, 345.0, 150.0, 22.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-75",
									"linecount" : 5,
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 540.0, 510.0, 223.0, 76.0 ],
									"text" : "th.gl.texteditor help-ctx2 1280 720 @cursor <-- @font Andale Mono @comment ## @blink_enable 1 @blink_time 100 @cursor_color 1 0 0 1 @blink_color 1 1 0 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-74",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "bang", "" ],
									"patching_rect" : [ 540.0, 437.0, 222.0, 22.0 ],
									"text" : "jit.world help-ctx2 @enable 0 @visible 0"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-73",
									"linecount" : 3,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 660.0, 240.0, 128.0, 47.0 ],
									"text" : "ALT + / \nto (un)comment the line the cursor is on"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-66",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 540.0, 300.0, 72.0, 22.0 ],
									"text" : "s customize"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-67",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 540.0, 173.0, 195.0, 20.0 ],
									"text" : "change the comment characters"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-68",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 525.0, 180.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "6",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-69",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 630.0, 195.0, 29.5, 22.0 ],
									"text" : "#"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-70",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 582.0, 195.0, 29.5, 22.0 ],
									"text" : "|"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-71",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 540.0, 240.0, 105.0, 22.0 ],
									"text" : "prepend comment"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-72",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 540.0, 195.0, 29.5, 22.0 ],
									"text" : "//"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-65",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 300.0, 72.0, 22.0 ],
									"text" : "s customize"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-63",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 294.5, 367.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "5",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-62",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 156.5, 382.0, 83.0, 22.0 ],
									"text" : "loadmess 250"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-61",
									"maxclass" : "number",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 156.5, 412.0, 50.0, 22.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-59",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 156.5, 442.0, 79.0, 22.0 ],
									"text" : "blink_time $1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-58",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 360.0, 212.5, 20.0 ],
									"text" : "enable cursor blinking and blinkspeed"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-47",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 28.5, 352.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "3",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-56",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 382.0, 70.0, 22.0 ],
									"text" : "loadmess 1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-55",
									"maxclass" : "toggle",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 45.0, 412.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-53",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 442.0, 93.0, 22.0 ],
									"text" : "blink_enable $1"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-51",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 375.0, 474.0, 134.0, 20.0 ],
									"text" : "change numbers color"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-50",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 353.5, 444.0, 155.0, 20.0 ],
									"text" : "change blink color"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-49",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 333.5, 414.0, 175.0, 20.0 ],
									"text" : "change cursor color"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-48",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 311.833333333333371, 384.0, 198.333333333333371, 20.0 ],
									"text" : "change font color"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-46",
									"maxclass" : "newobj",
									"numinlets" : 4,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patcher" : 									{
										"fileversion" : 1,
										"appversion" : 										{
											"major" : 8,
											"minor" : 0,
											"revision" : 8,
											"architecture" : "x64",
											"modernui" : 1
										}
,
										"classnamespace" : "box",
										"rect" : [ 59.0, 103.0, 640.0, 480.0 ],
										"bglocked" : 0,
										"openinpresentation" : 0,
										"default_fontsize" : 12.0,
										"default_fontface" : 0,
										"default_fontname" : "Arial",
										"gridonopen" : 1,
										"gridsize" : [ 15.0, 15.0 ],
										"gridsnaponopen" : 1,
										"objectsnaponopen" : 1,
										"statusbarvisible" : 2,
										"toolbarvisible" : 1,
										"lefttoolbarpinned" : 0,
										"toptoolbarpinned" : 0,
										"righttoolbarpinned" : 0,
										"bottomtoolbarpinned" : 0,
										"toolbars_unpinned_last_save" : 0,
										"tallnewobj" : 0,
										"boxanimatetime" : 200,
										"enablehscroll" : 1,
										"enablevscroll" : 1,
										"devicewidth" : 0.0,
										"description" : "",
										"digest" : "",
										"tags" : "",
										"style" : "",
										"subpatcher_template" : "",
										"boxes" : [ 											{
												"box" : 												{
													"id" : "obj-38",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 1,
													"outlettype" : [ "" ],
													"patching_rect" : [ 560.0, 130.0, 129.0, 22.0 ],
													"text" : "prepend number_color"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-40",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 2,
													"outlettype" : [ "list", "bang" ],
													"patching_rect" : [ 560.0, 100.0, 158.0, 22.0 ],
													"text" : "colorpicker @compatibility 0"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-35",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 1,
													"outlettype" : [ "" ],
													"patching_rect" : [ 395.0, 130.0, 113.0, 22.0 ],
													"text" : "prepend blink_color"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-37",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 2,
													"outlettype" : [ "list", "bang" ],
													"patching_rect" : [ 395.0, 100.0, 158.0, 22.0 ],
													"text" : "colorpicker @compatibility 0"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-32",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 1,
													"outlettype" : [ "" ],
													"patching_rect" : [ 230.5, 130.0, 122.0, 22.0 ],
													"text" : "prepend cursor_color"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-34",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 2,
													"outlettype" : [ "list", "bang" ],
													"patching_rect" : [ 230.5, 100.0, 158.0, 22.0 ],
													"text" : "colorpicker @compatibility 0"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-31",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 1,
													"outlettype" : [ "" ],
													"patching_rect" : [ 50.0, 130.0, 82.0, 22.0 ],
													"text" : "prepend color"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-28",
													"maxclass" : "newobj",
													"numinlets" : 1,
													"numoutlets" : 2,
													"outlettype" : [ "list", "bang" ],
													"patching_rect" : [ 50.0, 100.0, 158.0, 22.0 ],
													"text" : "colorpicker @compatibility 0"
												}

											}
, 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-41",
													"index" : 1,
													"maxclass" : "inlet",
													"numinlets" : 0,
													"numoutlets" : 1,
													"outlettype" : [ "bang" ],
													"patching_rect" : [ 50.0, 40.0, 30.0, 30.0 ]
												}

											}
, 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-42",
													"index" : 2,
													"maxclass" : "inlet",
													"numinlets" : 0,
													"numoutlets" : 1,
													"outlettype" : [ "bang" ],
													"patching_rect" : [ 230.5, 40.0, 30.0, 30.0 ]
												}

											}
, 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-43",
													"index" : 3,
													"maxclass" : "inlet",
													"numinlets" : 0,
													"numoutlets" : 1,
													"outlettype" : [ "bang" ],
													"patching_rect" : [ 395.0, 40.0, 30.0, 30.0 ]
												}

											}
, 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-44",
													"index" : 4,
													"maxclass" : "inlet",
													"numinlets" : 0,
													"numoutlets" : 1,
													"outlettype" : [ "bang" ],
													"patching_rect" : [ 560.0, 40.0, 30.0, 30.0 ]
												}

											}
, 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-45",
													"index" : 1,
													"maxclass" : "outlet",
													"numinlets" : 1,
													"numoutlets" : 0,
													"patching_rect" : [ 50.0, 210.0, 30.0, 30.0 ]
												}

											}
 ],
										"lines" : [ 											{
												"patchline" : 												{
													"destination" : [ "obj-31", 0 ],
													"source" : [ "obj-28", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-45", 0 ],
													"source" : [ "obj-31", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-45", 0 ],
													"source" : [ "obj-32", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-32", 0 ],
													"source" : [ "obj-34", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-45", 0 ],
													"source" : [ "obj-35", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-35", 0 ],
													"source" : [ "obj-37", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-45", 0 ],
													"source" : [ "obj-38", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-38", 0 ],
													"source" : [ "obj-40", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-28", 0 ],
													"source" : [ "obj-41", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-34", 0 ],
													"source" : [ "obj-42", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-37", 0 ],
													"source" : [ "obj-43", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-40", 0 ],
													"source" : [ "obj-44", 0 ]
												}

											}
 ]
									}
,
									"patching_rect" : [ 278.5, 517.0, 84.0, 22.0 ],
									"saved_object_attributes" : 									{
										"description" : "",
										"digest" : "",
										"globalpatchername" : "",
										"tags" : ""
									}
,
									"text" : "p colorPickers"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-39",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 343.5, 472.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-36",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 321.833333333333314, 442.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-33",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 300.166666666666686, 412.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-30",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 278.5, 382.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-26",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 409.0, 255.0, 69.0, 22.0 ],
									"text" : "Menlo Bold"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-25",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 399.0, 225.0, 79.0, 22.0 ],
									"text" : "Andale Mono"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-24",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 375.0, 195.0, 103.0, 22.0 ],
									"text" : "Courier New Bold"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-21",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 375.0, 300.0, 94.0, 22.0 ],
									"text" : "prepend symbol"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-17",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 240.0, 173.0, 210.0, 20.0 ],
									"text" : "change the font, use mono-spaced!"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-18",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 225.0, 180.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "2",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-16",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 278.5, 300.0, 76.0, 22.0 ],
									"text" : "prepend font"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-15",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"patching_rect" : [ 268.0, 195.0, 58.0, 22.0 ],
									"text" : "loadbang"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-14",
									"maxclass" : "button",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "bang" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 238.0, 195.0, 24.0, 24.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-12",
									"items" : [ "3Dventure Medium", ",", "Abadi MT Condensed Extra Bold", ",", "Abadi MT Condensed Light", ",", "Ableton Sans Bold", ",", "Ableton Sans Light", ",", "Ableton Sans Medium", ",", "AC Mountain Inverted", ",", "AC Mountain", ",", "Academy Engraved LET Plain", ",", "Adobe Arabic", ",", "Adobe Arabic Italic", ",", "Adobe Arabic Bold", ",", "Adobe Arabic Bold Italic", ",", "Adobe Caslon Pro", ",", "Adobe Caslon Pro Italic", ",", "Adobe Caslon Pro Semibold", ",", "Adobe Caslon Pro Semibold Italic", ",", "Adobe Caslon Pro Bold", ",", "Adobe Caslon Pro Bold Italic", ",", "Adobe Devanagari", ",", "Adobe Devanagari Italic", ",", "Adobe Devanagari Bold", ",", "Adobe Devanagari Bold Italic", ",", "Adobe Fan Heiti Std B", ",", "Adobe Fangsong Std R", ",", "Adobe Garamond Pro", ",", "Adobe Garamond Pro Italic", ",", "Adobe Garamond Pro Bold", ",", "Adobe Garamond Pro Bold Italic", ",", "Adobe Gothic Std B", ",", "Adobe Hebrew", ",", "Adobe Hebrew Italic", ",", "Adobe Hebrew Bold", ",", "Adobe Hebrew Bold Italic", ",", "Adobe Heiti Std R", ",", "Adobe Kaiti Std R", ",", "Adobe Ming Std L", ",", "Adobe Myungjo Std M", ",", "Adobe Naskh Medium", ",", "Adobe Song Std L", ",", "Aggressive Angry Baby Killer", ",", "Al Bayan Plain", ",", "Al Bayan Bold", ",", "Al Nile", ",", "Al Nile Bold", ",", "Al Tarikh", ",", "Alphabet SNK by PMPEPS", ",", "American Typewriter", ",", "American Typewriter Light", ",", "American Typewriter Semibold", ",", "American Typewriter Bold", ",", "American Typewriter Condensed", ",", "American Typewriter Condensed Light", ",", "American Typewriter Condensed Bold", ",", "Amiri", ",", "Amiri Italic", ",", "Amiri Bold", ",", "Amiri Bold Italic", ",", "Andale Mono", ",", "Anime Ace 2.0 BB", ",", "Apple Braille Outline 6 Dot", ",", "Apple Braille Outline 8 Dot", ",", "Apple Braille Pinpoint 6 Dot", ",", "Apple Braille Pinpoint 8 Dot", ",", "Apple Braille", ",", "Apple Chancery Chancery", ",", "Apple Color Emoji", ",", "Apple SD Gothic Neo", ",", "Apple SD Gothic Neo Thin", ",", "Apple SD Gothic Neo UltraLight", ",", "Apple SD Gothic Neo UltraLight", ",", "Apple SD Gothic Neo Light", ",", "Apple SD Gothic Neo Light", ",", "Apple SD Gothic Neo Medium", ",", "Apple SD Gothic Neo Medium", ",", "Apple SD Gothic Neo SemiBold", ",", "Apple SD Gothic Neo SemiBold", ",", "Apple SD Gothic Neo Bold", ",", "Apple SD Gothic Neo ExtraBold", ",", "Apple SD Gothic Neo ExtraBold", ",", "Apple SD Gothic Neo Heavy", ",", "Apple SD Gothic Neo Heavy", ",", "Apple SD Gothic Neo Thin", ",", "Apple Symbols", ",", "AppleGothic", ",", "AppleMyungjo", ",", "Arial", ",", "Arial Italic", ",", "Arial Bold", ",", "Arial Bold Italic", ",", "Arial Black", ",", "Arial Hebrew", ",", "Arial Hebrew Light", ",", "Arial Hebrew Bold", ",", "Arial Hebrew Scholar", ",", "Arial Hebrew Scholar Light", ",", "Arial Hebrew Scholar Bold", ",", "Arial Narrow", ",", "Arial Narrow Italic", ",", "Arial Narrow Bold", ",", "Arial Narrow Bold Italic", ",", "Arial Rounded MT Bold", ",", "Arial Unicode MS", ",", "Arno Pro Caption", ",", "Arno Pro Display", ",", "Arno Pro", ",", "Arno Pro SmText", ",", "Arno Pro Subhead", ",", "Arno Pro Italic", ",", "Arno Pro Italic Caption", ",", "Arno Pro Italic Display", ",", "Arno Pro Italic SmText", ",", "Arno Pro Italic Subhead", ",", "Arno Pro Light Display", ",", "Arno Pro Light Italic Display", ",", "Arno Pro Semibold", ",", "Arno Pro Semibold Caption", ",", "Arno Pro Semibold Display", ",", "Arno Pro Semibold SmText", ",", "Arno Pro Semibold Subhead", ",", "Arno Pro Semibold Italic", ",", "Arno Pro Semibold Italic Caption", ",", "Arno Pro Semibold Italic Display", ",", "Arno Pro Semibold Italic SmText", ",", "Arno Pro Semibold Italic Subhead", ",", "Arno Pro Bold", ",", "Arno Pro Bold Caption", ",", "Arno Pro Bold Display", ",", "Arno Pro Bold SmText", ",", "Arno Pro Bold Subhead", ",", "Arno Pro Bold Italic", ",", "Arno Pro Bold Italic Caption", ",", "Arno Pro Bold Italic Display", ",", "Arno Pro Bold Italic SmText", ",", "Arno Pro Bold Italic Subhead", ",", "Athelas", ",", "Athelas Italic", ",", "Athelas Bold", ",", "Athelas Bold Italic", ",", "Avenir Book", ",", "Avenir Roman", ",", "Avenir Book Oblique", ",", "Avenir Oblique", ",", "Avenir Light", ",", "Avenir Light Oblique", ",", "Avenir Medium", ",", "Avenir Medium Oblique", ",", "Avenir Heavy", ",", "Avenir Heavy Oblique", ",", "Avenir Black", ",", "Avenir Black Oblique", ",", "Avenir Next", ",", "Avenir Next Italic", ",", "Avenir Next Ultra Light", ",", "Avenir Next Ultra Light Italic", ",", "Avenir Next Medium", ",", "Avenir Next Medium Italic", ",", "Avenir Next Demi Bold", ",", "Avenir Next Demi Bold Italic", ",", "Avenir Next Bold", ",", "Avenir Next Bold Italic", ",", "Avenir Next Heavy", ",", "Avenir Next Heavy Italic", ",", "Avenir Next Condensed", ",", "Avenir Next Condensed Italic", ",", "Avenir Next Condensed Ultra Light", ",", "Avenir Next Condensed Ultra Light Italic", ",", "Avenir Next Condensed Medium", ",", "Avenir Next Condensed Medium Italic", ",", "Avenir Next Condensed Demi Bold", ",", "Avenir Next Condensed Demi Bold Italic", ",", "Avenir Next Condensed Bold", ",", "Avenir Next Condensed Bold Italic", ",", "Avenir Next Condensed Heavy", ",", "Avenir Next Condensed Heavy Italic", ",", "AvenirCondensedHand CondensedHand", ",", "Ayuthaya", ",", "Baghdad", ",", "Bangla MN", ",", "Bangla MN Bold", ",", "Bangla Sangam MN", ",", "Bangla Sangam MN Bold", ",", "Bank Gothic Light", ",", "Bank Gothic Medium", ",", "Barlow", ",", "Barlow Italic", ",", "Barlow ExtraLight", ",", "Barlow ExtraLight Italic", ",", "Barlow Light", ",", "Barlow Light Italic", ",", "Barlow Medium", ",", "Barlow Medium Italic", ",", "Barlow SemiBold", ",", "Barlow SemiBold Italic", ",", "Barlow Bold", ",", "Barlow Bold Italic", ",", "Barlow ExtraBold", ",", "Barlow ExtraBold Italic", ",", "Barlow Black", ",", "Barlow Black Italic", ",", "Barlow Thin", ",", "Barlow Thin Italic", ",", "Basica v.2012", ",", "Baskerville", ",", "Baskerville Italic", ",", "Baskerville SemiBold", ",", "Baskerville SemiBold Italic", ",", "Baskerville Bold", ",", "Baskerville Bold Italic", ",", "Baskerville Old Face", ",", "Batang", ",", "Bauhaus 93", ",", "Beirut", ",", "Bell Gothic Std Bold", ",", "Bell Gothic Std Black", ",", "Bell MT", ",", "Bell MT Italic", ",", "Bell MT Bold", ",", "Bernard MT Condensed", ",", "Bickham Script Pro", ",", "Bickham Script Pro Semibold", ",", "Bickham Script Pro Bold", ",", "Big Caslon Medium", ",", "Birch Std", ",", "Birmingham", ",", "BirminghamBold", ",", "BIRTH OF A HERO", ",", "Blackmoor LET Plain", ",", "Blackoak Std", ",", "BlairMdITC TT Medium", ",", "Blake", ",", "Bodoni 72 Book", ",", "Bodoni 72 Book Italic", ",", "Bodoni 72 Bold", ",", "Bodoni 72 Oldstyle Book", ",", "Bodoni 72 Oldstyle Book Italic", ",", "Bodoni 72 Oldstyle Bold", ",", "Bodoni 72 Smallcaps Book", ",", "Bodoni Ornaments", ",", "Book Antiqua", ",", "Book Antiqua Italic", ",", "Book Antiqua Bold", ",", "Book Antiqua Bold Italic", ",", "Bookman Old Style", ",", "Bookman Old Style Italic", ",", "Bookman Old Style Bold", ",", "Bookman Old Style Bold Italic", ",", "Bookshelf Symbol 7", ",", "Bordeaux Roman Bold LET Plain", ",", "Bradley Hand Bold", ",", "Braggadocio", ",", "Braille", ",", "Britannic Bold", ",", "Brush Script MT Italic", ",", "Brush Script Std Medium", ",", "Calibri", ",", "Calibri Italic", ",", "Calibri Bold", ",", "Calibri Bold Italic", ",", "Calisto MT", ",", "Calisto MT Italic", ",", "Calisto MT Bold", ",", "Calisto MT Bold Italic", ",", "Cambria", ",", "Cambria Italic", ",", "Cambria Bold", ",", "Cambria Bold Italic", ",", "Cambria Math", ",", "Candara", ",", "Candara Italic", ",", "Candara Bold", ",", "Candara Bold Italic", ",", "CANDY INC. TRIAL", ",", "Capitals", ",", "Cardenio Modern", ",", "Cardenio Modern Bold", ",", "Casual", ",", "Century", ",", "Century Gothic", ",", "Century Gothic Italic", ",", "Century Gothic Bold", ",", "Century Gothic Bold Italic", ",", "Century Schoolbook", ",", "Century Schoolbook Italic", ",", "Century Schoolbook Bold", ",", "Century Schoolbook Bold Italic", ",", "Chalkboard", ",", "Chalkboard Bold", ",", "Chalkboard SE", ",", "Chalkboard SE Light", ",", "Chalkboard SE Bold", ",", "Chalkduster", ",", "Chaparral Pro", ",", "Chaparral Pro Italic", ",", "Chaparral Pro Light Italic", ",", "Chaparral Pro Bold", ",", "Chaparral Pro Bold Italic", ",", "Charlemagne Std Bold", ",", "Charter Roman", ",", "Charter Italic", ",", "Charter Bold", ",", "Charter Bold Italic", ",", "Charter Black", ",", "Charter Black Italic", ",", "Clarks Summit", ",", "Cochin", ",", "Cochin Italic", ",", "Cochin Bold", ",", "Cochin Bold Italic", ",", "Code Bold", ",", "Code Light", ",", "Colonna MT", ",", "Comic Sans MS", ",", "Comic Sans MS Bold", ",", "Consolas", ",", "Consolas Italic", ",", "Consolas Bold", ",", "Consolas Bold Italic", ",", "Constantia", ",", "Constantia Italic", ",", "Constantia Bold", ",", "Constantia Bold Italic", ",", "Cooper Black", ",", "Cooper Std Black", ",", "Cooper Std Black Italic", ",", "Copperplate", ",", "Copperplate Light", ",", "Copperplate Bold", ",", "Copperplate Gothic Bold", ",", "Copperplate Gothic Light", ",", "Corbel", ",", "Corbel Italic", ",", "Corbel Bold", ",", "Corbel Bold Italic", ",", "Corsiva Hebrew", ",", "Corsiva Hebrew Bold", ",", "Courier", ",", "Courier Oblique", ",", "Courier Bold", ",", "Courier Bold Oblique", ",", "Courier New", ",", "Courier New Italic", ",", "Courier New Bold", ",", "Courier New Bold Italic", ",", "Cracked", ",", "Cubic", ",", "Curlz MT", ",", "Damascus", ",", "Damascus Light", ",", "Damascus Medium", ",", "Damascus Semi Bold", ",", "Damascus Bold", ",", "DecoType Naskh", ",", "Desdemona", ",", "Devanagari MT", ",", "Devanagari MT Bold", ",", "Devanagari Sangam MN", ",", "Devanagari Sangam MN Bold", ",", "Didot", ",", "Didot Italic", ",", "Didot Bold", ",", "Dimitri", ",", "Dimitri Swank", ",", "DIN Alternate Bold", ",", "DIN Condensed Bold", ",", "Diwan Kufi", ",", "Diwan Thuluth", ",", "Eccentric Std", ",", "Edwardian Script ITC", ",", "Engravers MT", ",", "Engravers MT Bold", ",", "Euphemia UCAS", ",", "Euphemia UCAS Italic", ",", "Euphemia UCAS Bold", ",", "Eurostile", ",", "Eurostile Bold", ",", "Farah", ",", "Farisi", ",", "Footlight MT Light", ",", "Franklin Gothic Book", ",", "Franklin Gothic Book Italic", ",", "Franklin Gothic Medium", ",", "Franklin Gothic Medium Italic", ",", "Futura Medium", ",", "Futura Medium Italic", ",", "Futura Bold", ",", "Futura Condensed Medium", ",", "Futura Condensed ExtraBold", ",", "Gabriola", ",", "Garamond", ",", "Garamond Italic", ",", "Garamond Bold", ",", "Garamond Premier Pro", ",", "Garamond Premier Pro Italic", ",", "Garamond Premier Pro Semibold", ",", "Garamond Premier Pro Semibold Italic", ",", "GB18030 Bitmap", ",", "Geeza Pro", ",", "Geeza Pro Bold", ",", "GelPenUpright Medium", ",", "GelPenUprightHeavy Heavy", ",", "GelPenUprightLight Light", ",", "Geneva", ",", "Georgia", ",", "Georgia Italic", ",", "Georgia Bold", ",", "Georgia Bold Italic", ",", "Giddyup Std", ",", "Gill Sans", ",", "Gill Sans Italic", ",", "Gill Sans Light", ",", "Gill Sans Light Italic", ",", "Gill Sans SemiBold", ",", "Gill Sans SemiBold Italic", ",", "Gill Sans Bold", ",", "Gill Sans Bold Italic", ",", "Gill Sans UltraBold", ",", "Gill Sans MT", ",", "Gill Sans MT Italic", ",", "Gill Sans MT Bold", ",", "Gill Sans MT Bold Italic", ",", "Gloucester MT Extra Condensed", ",", "Goudy Old Style Italic", ",", "Goudy Old Style", ",", "Goudy Old Style Bold", ",", "green piloww", ",", "Guitar Pro 5", ",", "Gujarati MT", ",", "Gujarati MT Bold", ",", "Gujarati Sangam MN", ",", "Gujarati Sangam MN Bold", ",", "Gulim", ",", "Gurmukhi MN", ",", "Gurmukhi MN Bold", ",", "Gurmukhi MT", ",", "Gurmukhi Sangam MN", ",", "Gurmukhi Sangam MN Bold", ",", "HACKED", ",", "Haettenschweiler", ",", "Halo", ",", "Halo Outline", ",", "Handwriting - Dakota", ",", "Harrington", ",", "Heiti SC Light", ",", "Heiti SC Medium", ",", "Heiti TC Light", ",", "Heiti TC Medium", ",", "Helsinki Metronome Std", ",", "Helsinki Special Std", ",", "Helsinki Std", ",", "Helsinki Text Std", ",", "Helvetica", ",", "Helvetica Oblique", ",", "Helvetica Light", ",", "Helvetica Light Oblique", ",", "Helvetica Bold", ",", "Helvetica Bold Oblique", ",", "Helvetica Neue", ",", "Helvetica Neue Italic", ",", "Helvetica Neue UltraLight", ",", "Helvetica Neue UltraLight Italic", ",", "Helvetica Neue Thin", ",", "Helvetica Neue Thin Italic", ",", "Helvetica Neue Light", ",", "Helvetica Neue Light Italic", ",", "Helvetica Neue Medium", ",", "Helvetica Neue Medium Italic", ",", "Helvetica Neue Bold", ",", "Helvetica Neue Bold Italic", ",", "Helvetica Neue Condensed Bold", ",", "Helvetica Neue Condensed Black", ",", "Herculanum", ",", "Hind Guntur", ",", "Hind Guntur Light", ",", "Hind Guntur Medium", ",", "Hind Guntur SemiBold", ",", "Hind Guntur Bold", ",", "Hiragino Kaku Gothic Pro W3", ",", "Hiragino Kaku Gothic Pro W3", ",", "Hiragino Kaku Gothic Pro W6", ",", "Hiragino Kaku Gothic Pro W6", ",", "Hiragino Kaku Gothic ProN W3", ",", "Hiragino Kaku Gothic ProN W6", ",", "Hiragino Kaku Gothic Std W8", ",", "Hiragino Kaku Gothic Std W8", ",", "Hiragino Kaku Gothic StdN W8", ",", "Hiragino Kaku Gothic StdN W8", ",", "Hiragino Maru Gothic Pro W4", ",", "Hiragino Maru Gothic ProN W4", ",", "Hiragino Mincho Pro W3", ",", "Hiragino Mincho Pro W3", ",", "Hiragino Mincho Pro W6", ",", "Hiragino Mincho Pro W6", ",", "Hiragino Mincho ProN W3", ",", "Hiragino Mincho ProN W6", ",", "Hiragino Sans W0", ",", "Hiragino Sans W1", ",", "Hiragino Sans W2", ",", "Hiragino Sans W3", ",", "Hiragino Sans W4", ",", "Hiragino Sans W5", ",", "Hiragino Sans W6", ",", "Hiragino Sans W7", ",", "Hiragino Sans W8", ",", "Hiragino Sans W9", ",", "Hiragino Sans GB W3", ",", "Hiragino Sans GB W3", ",", "Hiragino Sans GB W6", ",", "Hiragino Sans GB W6", ",", "Hobo Std Medium", ",", "Hoefler Text", ",", "Hoefler Text Ornaments", ",", "Hoefler Text Italic", ",", "Hoefler Text Black", ",", "Hoefler Text Black Italic", ",", "IBM Plex Mono", ",", "IBM Plex Mono Italic", ",", "IBM Plex Mono ExtraLight", ",", "IBM Plex Mono ExtraLight Italic", ",", "IBM Plex Mono Light", ",", "IBM Plex Mono Light Italic", ",", "IBM Plex Mono Medium", ",", "IBM Plex Mono Text", ",", "IBM Plex Mono Medium Italic", ",", "IBM Plex Mono Text Italic", ",", "IBM Plex Mono SemiBold", ",", "IBM Plex Mono SemiBold Italic", ",", "IBM Plex Mono Bold", ",", "IBM Plex Mono Bold Italic", ",", "IBM Plex Mono Thin", ",", "IBM Plex Mono Thin Italic", ",", "IBM Plex Sans", ",", "IBM Plex Sans Italic", ",", "IBM Plex Sans ExtraLight", ",", "IBM Plex Sans ExtraLight Italic", ",", "IBM Plex Sans Light", ",", "IBM Plex Sans Light Italic", ",", "IBM Plex Sans Medium", ",", "IBM Plex Sans Text", ",", "IBM Plex Sans Medium Italic", ",", "IBM Plex Sans Text Italic", ",", "IBM Plex Sans SemiBold", ",", "IBM Plex Sans SemiBold Italic", ",", "IBM Plex Sans Bold", ",", "IBM Plex Sans Bold Italic", ",", "IBM Plex Sans Thin", ",", "IBM Plex Sans Thin Italic", ",", "IBM Plex Serif", ",", "IBM Plex Serif Italic", ",", "IBM Plex Serif ExtraLight", ",", "IBM Plex Serif ExtraLight Italic", ",", "IBM Plex Serif Light", ",", "IBM Plex Serif Light Italic", ",", "IBM Plex Serif Medium", ",", "IBM Plex Serif Text", ",", "IBM Plex Serif Medium Italic", ",", "IBM Plex Serif Text Italic", ",", "IBM Plex Serif SemiBold", ",", "IBM Plex Serif SemiBold Italic", ",", "IBM Plex Serif Bold", ",", "IBM Plex Serif Bold Italic", ",", "IBM Plex Serif Thin", ",", "IBM Plex Serif Thin Italic", ",", "Impact", ",", "Imprint MT Shadow", ",", "InaiMathi", ",", "Inconsolata", ",", "Inconsolata Bold", ",", "Inkpen2 Chords Std", ",", "Inkpen2 Metronome Std", ",", "Inkpen2 Script Std", ",", "Inkpen2 Special Std", ",", "Inkpen2 Std", ",", "Inkpen2 Text Std", ",", "Iowan Old Style Roman", ",", "Iowan Old Style Titling", ",", "Iowan Old Style Italic", ",", "Iowan Old Style Bold", ",", "Iowan Old Style Bold Italic", ",", "Iowan Old Style Black", ",", "Iowan Old Style Black Italic", ",", "ITF Devanagari Book", ",", "ITF Devanagari Light", ",", "ITF Devanagari Medium", ",", "ITF Devanagari Demi", ",", "ITF Devanagari Bold", ",", "ITF Devanagari Marathi Book", ",", "ITF Devanagari Marathi Light", ",", "ITF Devanagari Marathi Medium", ",", "ITF Devanagari Marathi Demi", ",", "ITF Devanagari Marathi Bold", ",", "Jazz LET Plain", ",", "Kailasa", ",", "Kailasa Bold", ",", "Kaiso Next B", ",", "Kannada MN", ",", "Kannada MN Bold", ",", "Kannada Sangam MN", ",", "Kannada Sangam MN Bold", ",", "Kefa", ",", "Kefa Bold", ",", "Khmer MN", ",", "Khmer MN Bold", ",", "Khmer Sangam MN", ",", "Kino MT", ",", "Kohinoor Bangla", ",", "Kohinoor Bangla Light", ",", "Kohinoor Bangla Medium", ",", "Kohinoor Bangla Semibold", ",", "Kohinoor Bangla Bold", ",", "Kohinoor Devanagari", ",", "Kohinoor Devanagari Light", ",", "Kohinoor Devanagari Medium", ",", "Kohinoor Devanagari Semibold", ",", "Kohinoor Devanagari Bold", ",", "Kohinoor Telugu", ",", "Kohinoor Telugu Light", ",", "Kohinoor Telugu Medium", ",", "Kohinoor Telugu Semibold", ",", "Kohinoor Telugu Bold", ",", "Kokonor", ",", "Kozuka Gothic Pr6N R", ",", "Kozuka Gothic Pr6N EL", ",", "Kozuka Gothic Pr6N L", ",", "Kozuka Gothic Pr6N M", ",", "Kozuka Gothic Pr6N B", ",", "Kozuka Gothic Pr6N H", ",", "Kozuka Gothic Pro R", ",", "Kozuka Gothic Pro EL", ",", "Kozuka Gothic Pro L", ",", "Kozuka Gothic Pro M", ",", "Kozuka Gothic Pro B", ",", "Kozuka Gothic Pro H", ",", "Kozuka Mincho Pr6N R", ",", "Kozuka Mincho Pr6N EL", ",", "Kozuka Mincho Pr6N L", ",", "Kozuka Mincho Pr6N M", ",", "Kozuka Mincho Pr6N B", ",", "Kozuka Mincho Pr6N H", ",", "Kozuka Mincho Pro R", ",", "Kozuka Mincho Pro EL", ",", "Kozuka Mincho Pro L", ",", "Kozuka Mincho Pro M", ",", "Kozuka Mincho Pro B", ",", "Kozuka Mincho Pro H", ",", "Krungthep", ",", "KufiStandardGK", ",", "Lao MN", ",", "Lao MN Bold", ",", "Lao Sangam MN", ",", "Lato", ",", "Lato Italic", ",", "Lato Hairline", ",", "Lato Hairline Italic", ",", "Lato Light", ",", "Lato Light Italic", ",", "Lato Medium", ",", "Lato Medium Italic", ",", "Lato Semibold", ",", "Lato Semibold Italic", ",", "Lato Bold", ",", "Lato Bold Italic", ",", "Lato Heavy", ",", "Lato Heavy Italic", ",", "Lato Black", ",", "Lato Black Italic", ",", "Lato Thin", ",", "Lato Thin Italic", ",", "Letter Gothic Std Slanted", ",", "Letter Gothic Std Medium", ",", "Letter Gothic Std Bold", ",", "Letter Gothic Std Bold Slanted", ",", "Libre Baskerville", ",", "Libre Baskerville Italic", ",", "Libre Baskerville Bold", ",", "Linux Libertine", ",", "Linux Libertine Italic", ",", "Linux Libertine Semibold", ",", "Linux Libertine Semibold Italic", ",", "Linux Libertine Bold", ",", "Linux Libertine Bold Italic", ",", "Linux Libertine Display", ",", "Lithos Pro", ",", "Lithos Pro Black", ",", "Lucida Blackletter", ",", "Lucida Bright", ",", "Lucida Bright Italic", ",", "Lucida Bright Demibold", ",", "Lucida Bright Demibold Italic", ",", "Lucida Calligraphy Italic", ",", "Lucida Console", ",", "Lucida Fax", ",", "Lucida Fax Italic", ",", "Lucida Fax Demibold", ",", "Lucida Fax Demibold Italic", ",", "Lucida Grande", ",", "Lucida Grande Bold", ",", "Lucida Handwriting Italic", ",", "Lucida Sans", ",", "Lucida Sans Italic", ",", "Lucida Sans Demibold Roman", ",", "Lucida Sans Demibold Italic", ",", "Lucida Sans Typewriter", ",", "Lucida Sans Typewriter Oblique", ",", "Lucida Sans Typewriter Bold", ",", "Lucida Sans Typewriter Bold Oblique", ",", "Lucida Sans Unicode", ",", "Luminari", ",", "Malayalam MN", ",", "Malayalam MN Bold", ",", "Malayalam Sangam MN", ",", "Malayalam Sangam MN Bold", ",", "Manbow Clear", ",", "Manbow Dots", ",", "Manbow Fill", ",", "Manbow Lines", ",", "Manbow Screen", ",", "Manbow Solid", ",", "Manbow Spots", ",", "Manbow Stripe", ",", "Manbow Tone", ",", "Marion", ",", "Marion Italic", ",", "Marion Bold", ",", "Marker Felt Thin", ",", "Marker Felt Wide", ",", "Marlett", ",", "MASTERPLAN TRIAL", ",", "Matrix Code NFI", ",", "Matura MT Script Capitals", ",", "Meiryo", ",", "Meiryo Italic", ",", "Meiryo Bold", ",", "Meiryo Bold Italic", ",", "Menlo", ",", "Menlo Italic", ",", "Menlo Bold", ",", "Menlo Bold Italic", ",", "Merriweather Sans", ",", "Merriweather Sans Italic", ",", "Merriweather Sans Light", ",", "Merriweather Sans Light Italic", ",", "Merriweather Sans Bold", ",", "Merriweather Sans Bold Italic", ",", "Merriweather Sans ExtraBold", ",", "Merriweather Sans ExtraBold Italic", ",", "Mesquite Std Medium", ",", "metafors", ",", "Microsoft Sans Serif", ",", "Minion Pro", ",", "Minion Pro Italic", ",", "Minion Pro Medium", ",", "Minion Pro Medium Italic", ",", "Minion Pro Semibold", ",", "Minion Pro Semibold Italic", ",", "Minion Pro Bold", ",", "Minion Pro Bold Italic", ",", "Minion Pro Bold Cond", ",", "Minion Pro Bold Cond Italic", ",", "Mishafi", ",", "Mishafi Gold", ",", "Mistral", ",", "Modern No. 20", ",", "Mona Lisa Solid ITC TT", ",", "Monaco", ",", "Monotype Corsiva", ",", "Monotype Sorts", ",", "MS Gothic", ",", "MS Mincho", ",", "MS PGothic", ",", "MS PMincho", ",", "MS Reference Sans Serif", ",", "MS Reference Specialty", ",", "Mshtakan", ",", "Mshtakan Oblique", ",", "Mshtakan Bold", ",", "Mshtakan BoldOblique", ",", "MT Extra", ",", "Muna", ",", "Muna Bold", ",", "Muna Black", ",", "Museo 500", ",", "Myanmar MN", ",", "Myanmar MN Bold", ",", "Myanmar Sangam MN", ",", "Myanmar Sangam MN Bold", ",", "Myriad Arabic", ",", "Myriad Arabic Italic", ",", "Myriad Arabic Bold", ",", "Myriad Arabic Bold Italic", ",", "Myriad Hebrew", ",", "Myriad Hebrew Italic", ",", "Myriad Hebrew Bold", ",", "Myriad Hebrew Bold Italic", ",", "Myriad Pro", ",", "Myriad Pro Italic", ",", "Myriad Pro Semibold", ",", "Myriad Pro Semibold Italic", ",", "Myriad Pro Bold", ",", "Myriad Pro Bold Italic", ",", "Myriad Pro Condensed", ",", "Myriad Pro Condensed Italic", ",", "Myriad Pro Bold Condensed", ",", "Myriad Pro Bold Condensed Italic", ",", "Myriad Web Pro", ",", "Myriad Web Pro Italic", ",", "Myriad Web Pro Bold", ",", "Myriad Web Pro Condensed", ",", "Myriad Web Pro Condensed Italic", ",", "Nadeem", ",", "New Peninim MT", ",", "New Peninim MT Inclined", ",", "New Peninim MT Bold", ",", "New Peninim MT Bold Inclined", ",", "News Gothic MT", ",", "News Gothic MT Italic", ",", "News Gothic MT Bold", ",", "NipCen's Handwriting Regular", ",", "Noteworthy Light", ",", "Noteworthy Bold", ",", "Noto Sans", ",", "Noto Sans Italic", ",", "Noto Sans Bold", ",", "Noto Sans Bold Italic", ",", "Noto Serif", ",", "Noto Serif Italic", ",", "Noto Serif Bold", ",", "Noto Serif Bold Italic", ",", "November for bach", ",", "Nueva Std", ",", "Nueva Std Italic", ",", "Nueva Std Bold", ",", "Nueva Std Bold Italic", ",", "Nueva Std Condensed", ",", "Nueva Std Condensed Italic", ",", "Nueva Std Bold Condensed", ",", "Nueva Std Bold Condensed Italic", ",", "OCR A Std", ",", "Onyx", ",", "Optima", ",", "Optima Italic", ",", "Optima Bold", ",", "Optima Bold Italic", ",", "Optima ExtraBlack", ",", "Opus", ",", "Opus Big Time Std", ",", "Opus Chords", ",", "Opus Chords Sans", ",", "Opus Chords Sans Condensed", ",", "Opus Chords Sans Condensed Std", ",", "Opus Chords Sans Std", ",", "Opus Chords Std", ",", "Opus Figured Bass", ",", "Opus Figured Bass Extras", ",", "Opus Figured Bass Extras Std", ",", "Opus Figured Bass Std", ",", "Opus Function Symbols", ",", "Opus Function Symbols Std", ",", "Opus Japanese Chords", ",", "Opus Metronome", ",", "Opus Metronome Std", ",", "Opus Note Names", ",", "Opus Note Names Std", ",", "Opus Ornaments", ",", "Opus Ornaments Std", ",", "Opus Percussion", ",", "Opus Percussion Std", ",", "Opus PlainChords", ",", "Opus PlainChords Std", ",", "Opus Roman Chords", ",", "Opus Roman Chords Std", ",", "Opus Special", ",", "Opus Special Extra", ",", "Opus Special Extra Std", ",", "Opus Special Std", ",", "Opus Std", ",", "Opus Text", ",", "Opus Text Std", ",", "Orator Std Slanted", ",", "Orator Std Medium", ",", "Oriya MN", ",", "Oriya MN Bold", ",", "Oriya Sangam MN", ",", "Oriya Sangam MN Bold", ",", "Palatino", ",", "Palatino", ",", "Palatino Italic", ",", "Palatino Italic", ",", "Palatino Bold", ",", "Palatino Bold", ",", "Palatino Bold Italic", ",", "Palatino Bold Italic", ",", "Palatino Linotype", ",", "Palatino Linotype Italic", ",", "Palatino Linotype Bold", ",", "Palatino Linotype Bold Italic", ",", "Papyrus", ",", "Papyrus Condensed", ",", "Park Lane NF", ",", "Party LET Plain", ",", "Perpetua", ",", "Perpetua Italic", ",", "Perpetua Bold", ",", "Perpetua Bold Italic", ",", "Perpetua Titling MT Light", ",", "Perpetua Titling MT Bold", ",", "Phosphate Inline", ",", "Phosphate Solid", ",", "PingFang HK", ",", "PingFang HK Ultralight", ",", "PingFang HK Thin", ",", "PingFang HK Light", ",", "PingFang HK Medium", ",", "PingFang HK Semibold", ",", "PingFang SC", ",", "PingFang SC Ultralight", ",", "PingFang SC Thin", ",", "PingFang SC Light", ",", "PingFang SC Medium", ",", "PingFang SC Semibold", ",", "PingFang TC", ",", "PingFang TC Ultralight", ",", "PingFang TC Thin", ",", "PingFang TC Light", ",", "PingFang TC Medium", ",", "PingFang TC Semibold", ",", "Plantagenet Cherokee", ",", "Plantin MT Std", ",", "Plantin MT Std Italic", ",", "Plantin MT Std Bold", ",", "Plantin MT Std Bold Italic", ",", "Playbill", ",", "PMingLiU", ",", "Poplar Std Black", ",", "PortagoITC TT", ",", "Prestige Elite Std Bold", ",", "Princetown LET", ",", "PT Mono", ",", "PT Mono Bold", ",", "PT Sans", ",", "PT Sans Italic", ",", "PT Sans Bold", ",", "PT Sans Bold Italic", ",", "PT Sans Caption", ",", "PT Sans Caption Bold", ",", "PT Sans Narrow", ",", "PT Sans Narrow Bold", ",", "PT Serif", ",", "PT Serif Italic", ",", "PT Serif Bold", ",", "PT Serif Bold Italic", ",", "PT Serif Caption", ",", "PT Serif Caption Italic", ",", "Raanana", ",", "Raanana Bold", ",", "Red Moon Rising", ",", "REMARK", ",", "Reprise Big Time Std", ",", "Reprise Chords Std", ",", "Reprise Metronome Std", ",", "Reprise Rehearsal Std", ",", "Reprise Script Std", ",", "Reprise Special Std", ",", "Reprise Stamp Std", ",", "Reprise Std", ",", "Reprise Text Std", ",", "Reprise Title Std", ",", "REVOLUTION REVOLUTION", ",", "Roboto", ",", "Roboto Italic", ",", "Roboto Light", ",", "Roboto Light Italic", ",", "Roboto Medium", ",", "Roboto Medium Italic", ",", "Roboto Bold", ",", "Roboto Bold Italic", ",", "Roboto Black", ",", "Roboto Black Italic", ",", "Roboto Thin", ",", "Roboto Thin Italic", ",", "Roboto Mono", ",", "Roboto Mono Italic", ",", "Roboto Mono Light", ",", "Roboto Mono Light Italic", ",", "Roboto Mono Medium", ",", "Roboto Mono Medium Italic", ",", "Roboto Mono Bold", ",", "Roboto Mono Bold Italic", ",", "Roboto Mono Thin", ",", "Roboto Mono Thin Italic", ",", "Rockwell", ",", "Rockwell Italic", ",", "Rockwell Bold", ",", "Rockwell Bold Italic", ",", "Rockwell Extra Bold", ",", "Rosewood Std", ",", "Sana", ",", "Santa Fe LET Plain", ",", "Sathu", ",", "Savoye LET Plain", ",", "SchoolHouse Cursive B", ",", "SchoolHouse Printed A", ",", "Seravek", ",", "Seravek Italic", ",", "Seravek ExtraLight", ",", "Seravek ExtraLight Italic", ",", "Seravek Light", ",", "Seravek Light Italic", ",", "Seravek Medium", ",", "Seravek Medium Italic", ",", "Seravek Bold", ",", "Seravek Bold Italic", ",", "Shree Devanagari 714", ",", "Shree Devanagari 714 Italic", ",", "Shree Devanagari 714 Bold", ",", "Shree Devanagari 714 Bold Italic", ",", "SignPainter HouseScript", ",", "SignPainter HouseScript Semibold", ",", "Silom", ",", "SimSun", ",", "Sin City", ",", "Sinhala MN", ",", "Sinhala MN Bold", ",", "Sinhala Sangam MN", ",", "Sinhala Sangam MN Bold", ",", "Skia", ",", "Skia Light", ",", "Skia Bold", ",", "Skia Black", ",", "Skia Extended", ",", "Skia Light Extended", ",", "Skia Black Extended", ",", "Skia Condensed", ",", "Skia Light Condensed", ",", "Skia Black Condensed", ",", "Snell Roundhand", ",", "Snell Roundhand Bold", ",", "Snell Roundhand Black", ",", "Songti SC", ",", "Songti SC Light", ",", "Songti SC Bold", ",", "Songti SC Black", ",", "Songti TC", ",", "Songti TC Light", ",", "Songti TC Bold", ",", "Source Code Pro", ",", "Source Code Pro Italic", ",", "Source Code Pro ExtraLight", ",", "Source Code Pro ExtraLight Italic", ",", "Source Code Pro Light", ",", "Source Code Pro Light Italic", ",", "Source Code Pro Medium", ",", "Source Code Pro Medium Italic", ",", "Source Code Pro Semibold", ",", "Source Code Pro Semibold Italic", ",", "Source Code Pro Bold", ",", "Source Code Pro Bold Italic", ",", "Source Code Pro Black", ",", "Source Code Pro Black Italic", ",", "Space Mono", ",", "Space Mono Italic", ",", "Space Mono Bold", ",", "Space Mono Bold Italic", ",", "Springtime", ",", "Stencil", ",", "Stencil Std Bold", ",", "STIXGeneral", ",", "STIXGeneral Italic", ",", "STIXGeneral Bold", ",", "STIXGeneral Bold Italic", ",", "STIXIntegralsD", ",", "STIXIntegralsD Bold", ",", "STIXIntegralsSm", ",", "STIXIntegralsSm Bold", ",", "STIXIntegralsUp", ",", "STIXIntegralsUp Bold", ",", "STIXIntegralsUpD", ",", "STIXIntegralsUpD Bold", ",", "STIXIntegralsUpSm", ",", "STIXIntegralsUpSm Bold", ",", "STIXNonUnicode", ",", "STIXNonUnicode Italic", ",", "STIXNonUnicode Bold", ",", "STIXNonUnicode Bold Italic", ",", "STIXSizeFiveSym", ",", "STIXSizeFourSym", ",", "STIXSizeFourSym Bold", ",", "STIXSizeOneSym", ",", "STIXSizeOneSym Bold", ",", "STIXSizeThreeSym", ",", "STIXSizeThreeSym Bold", ",", "STIXSizeTwoSym", ",", "STIXSizeTwoSym Bold", ",", "STIXVariants", ",", "STIXVariants Bold", ",", "Stone Sans ITC TT Bold", ",", "Stone Sans Sem ITC TT Semi", ",", "Stone Sans Sem ITC TT SemiIta", ",", "STSong", ",", "Sukhumvit Set Text", ",", "Sukhumvit Set Light", ",", "Sukhumvit Set Medium", ",", "Sukhumvit Set Semi Bold", ",", "Sukhumvit Set Bold", ",", "Sukhumvit Set Thin", ",", "Superclarendon", ",", "Superclarendon Italic", ",", "Superclarendon Light", ",", "Superclarendon Light Italic", ",", "Superclarendon Bold", ",", "Superclarendon Bold Italic", ",", "Superclarendon Black", ",", "Superclarendon Black Italic", ",", "Symbol", ",", "Synchro LET", ",", "Tahoma Normal", ",", "Tahoma Negreta", ",", "Tamil MN", ",", "Tamil MN Bold", ",", "Tamil Sangam MN", ",", "Tamil Sangam MN Bold", ",", "Tekton Pro", ",", "Tekton Pro Oblique", ",", "Tekton Pro Bold", ",", "Tekton Pro Bold Oblique", ",", "Tekton Pro Bold Extended", ",", "Tekton Pro Bold Condensed", ",", "Telugu MN", ",", "Telugu MN Bold", ",", "Telugu Sangam MN", ",", "Telugu Sangam MN Bold", ",", "Thonburi", ",", "Thonburi Light", ",", "Thonburi Bold", ",", "Times", ",", "Times Italic", ",", "Times Bold", ",", "Times Bold Italic", ",", "Times New Roman", ",", "Times New Roman Italic", ",", "Times New Roman Bold", ",", "Times New Roman Bold Italic", ",", "Trajan Pro", ",", "Trajan Pro Bold", ",", "Trattatello", ",", "Trebuchet MS", ",", "Trebuchet MS Italic", ",", "Trebuchet MS Bold", ",", "Trebuchet MS Bold Italic", ",", "Tw Cen MT", ",", "Tw Cen MT Italic", ",", "Tw Cen MT Bold", ",", "Tw Cen MT Bold Italic", ",", "Type Embellishments One LET Embellishments One LET Plain", ",", "Ubuntu Mono", ",", "Ubuntu Mono Italic", ",", "Ubuntu Mono Bold", ",", "Ubuntu Mono Bold Italic", ",", "UNIVERSAL-COLLEGE-draft", ",", "Varsity", ",", "Verdana", ",", "Verdana Italic", ",", "Verdana Bold", ",", "Verdana Bold Italic", ",", "Very Damaged UL", ",", "VisualBraille VisualBraille", ",", "Vollkorn", ",", "Vollkorn Italic", ",", "Vollkorn SemiBold", ",", "Vollkorn SemiBold Italic", ",", "Vollkorn Bold", ",", "Vollkorn Bold Italic", ",", "Vollkorn Black", ",", "Vollkorn Black Italic", ",", "VT323", ",", "Waseem", ",", "Waseem Light", ",", "Webdings", ",", "Wide Latin", ",", "Wingdings", ",", "Wingdings 2", ",", "Wingdings 3", ",", "Zapf Dingbats", ",", "Zapfino" ],
									"maxclass" : "umenu",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "int", "", "" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 238.0, 270.0, 100.0, 22.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-11",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 238.0, 240.0, 43.0, 22.0 ],
									"text" : "fontlist"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-10",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 173.0, 165.0, 20.0 ],
									"text" : "change the cursor characters"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-27",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 30.0, 180.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "1",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-8",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 135.0, 195.0, 50.0, 22.0 ],
									"text" : "<CRSR"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-7",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 87.0, 195.0, 29.5, 22.0 ],
									"text" : "||"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-6",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 240.0, 89.0, 22.0 ],
									"text" : "prepend cursor"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-5",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 195.0, 30.0, 22.0 ],
									"text" : "<=="
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-3",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 517.0, 72.0, 22.0 ],
									"text" : "s customize"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-2",
									"linecount" : 3,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 105.0, 366.0, 47.0 ],
									"text" : "You can customize certain aspects of the editor such as font, font-color, cursor-color, blink-color, blink-speed, number-color, comment-characters, cursor-characters"
								}

							}
, 							{
								"box" : 								{
									"fontface" : 0,
									"fontname" : "Arial",
									"fontsize" : 40.0,
									"id" : "obj-22",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 45.0, 367.0, 51.0 ],
									"text" : "th.gl.texteditor",
									"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"attr" : "enable",
									"id" : "obj-76",
									"maxclass" : "attrui",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 540.0, 376.0, 150.0, 22.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-12", 0 ],
									"source" : [ "obj-11", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-16", 0 ],
									"source" : [ "obj-12", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"source" : [ "obj-14", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"source" : [ "obj-15", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-65", 0 ],
									"source" : [ "obj-16", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-12", 0 ],
									"source" : [ "obj-21", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-25", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-21", 0 ],
									"source" : [ "obj-26", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-46", 0 ],
									"source" : [ "obj-30", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-46", 1 ],
									"source" : [ "obj-33", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-46", 2 ],
									"source" : [ "obj-36", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-46", 3 ],
									"source" : [ "obj-39", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"source" : [ "obj-46", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"source" : [ "obj-53", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-53", 0 ],
									"source" : [ "obj-55", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-55", 0 ],
									"source" : [ "obj-56", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-3", 0 ],
									"source" : [ "obj-59", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-65", 0 ],
									"source" : [ "obj-6", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-59", 0 ],
									"source" : [ "obj-61", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-61", 0 ],
									"source" : [ "obj-62", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-71", 0 ],
									"source" : [ "obj-69", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-71", 0 ],
									"source" : [ "obj-70", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-66", 0 ],
									"source" : [ "obj-71", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-71", 0 ],
									"source" : [ "obj-72", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-75", 0 ],
									"order" : 1,
									"source" : [ "obj-74", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-79", 0 ],
									"midpoints" : [ 651.0, 469.0, 530.75, 469.0, 530.75, 387.0, 724.5, 387.0 ],
									"order" : 0,
									"source" : [ "obj-74", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-80", 0 ],
									"source" : [ "obj-74", 2 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-74", 0 ],
									"source" : [ "obj-76", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-74", 0 ],
									"source" : [ "obj-77", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-74", 0 ],
									"source" : [ "obj-79", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-8", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-75", 0 ],
									"source" : [ "obj-80", 0 ]
								}

							}
 ],
						"styles" : [ 							{
								"name" : "AudioStatus_Menu",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "color",
										"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
										"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39,
										"autogradient" : 0
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "Audiomix",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "gradient",
										"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
 ]
					}
,
					"patching_rect" : [ 75.0, 300.0, 73.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p customize"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 8,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 0.0, 26.0, 861.0, 613.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"showontab" : 1,
						"boxes" : [ 							{
								"box" : 								{
									"fontface" : 1,
									"fontsize" : 12.0,
									"id" : "obj-3",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 431.0, 120.0, 367.0, 20.0 ],
									"text" : "Short Keys:"
								}

							}
, 							{
								"box" : 								{
									"fontsize" : 12.0,
									"id" : "obj-2",
									"linecount" : 21,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 431.0, 142.0, 367.0, 288.0 ],
									"text" : "var ALT_A //back one character\nvar ALT_S //down one line\nvar ALT_D //forward one character\nvar ALT_W //up one line\n\nvar ALT_Q //move to top of page\nvar ALT_SHFT_Q //move to bottom of page\n\nvar ALT_Z //undo edit\nvar ALT_SHFT_Z //redo edit\n\nvar ALT_X //delete a line of code\nvar ALT_C //copy a line of code\nvar ALT_V //paste-insert a line of code\nvar ALT_P //copy+paste line\n\nvar ALT_B //backspace a character\nvar ALT_FS //(un)comment a line of code\n\nvar ALT_J //jump 1 word left\nvar ALT_L //jump 1 word right"
								}

							}
, 							{
								"box" : 								{
									"fontface" : 1,
									"fontsize" : 12.0,
									"id" : "obj-1",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 120.0, 367.0, 20.0 ],
									"text" : "Texteditor Functionalities:"
								}

							}
, 							{
								"box" : 								{
									"fontface" : 0,
									"fontname" : "Arial",
									"fontsize" : 40.0,
									"id" : "obj-22",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 45.0, 367.0, 51.0 ],
									"text" : "th.gl.texteditor",
									"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontsize" : 12.0,
									"id" : "obj-41",
									"linecount" : 14,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 142.0, 371.0, 194.0 ],
									"text" : "- You can type all characters and some special characters that work with SHFT + char (all characters most be part of ASCII table)\n\n- Not included are ALT + char.\n\n- Backspace works to delete a character in front of the cursor\n\n- Enter/Return outputs message typed on the commandline\n\n- Use the arrow's left/right to navigate with the cursor\n\n- Use the arrow's up/down to scroll through the history\n\n- Hold the backspace for quick erase"
								}

							}
 ],
						"lines" : [  ],
						"styles" : [ 							{
								"name" : "AudioStatus_Menu",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "color",
										"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
										"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39,
										"autogradient" : 0
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "Audiomix",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "gradient",
										"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
 ]
					}
,
					"patching_rect" : [ 103.0, 344.0, 70.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p shortkeys"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-47",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 8,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 0.0, 26.0, 861.0, 613.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"showontab" : 1,
						"boxes" : [  ],
						"lines" : [  ],
						"styles" : [ 							{
								"name" : "AudioStatus_Menu",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "color",
										"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
										"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39,
										"autogradient" : 0
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
, 							{
								"name" : "Audiomix",
								"default" : 								{
									"bgfillcolor" : 									{
										"type" : "gradient",
										"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
										"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
										"angle" : 270.0,
										"proportion" : 0.39
									}

								}
,
								"parentstyle" : "",
								"multi" : 0
							}
 ]
					}
,
					"patching_rect" : [ 121.0, 390.0, 27.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p ?"
				}

			}
, 			{
				"box" : 				{
					"fontface" : 1,
					"fontsize" : 12.0,
					"id" : "obj-21",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 98.0, 367.0, 20.0 ],
					"text" : "written by Timo Hoogland © 2019, www.timohoogland.com"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-88",
					"linecount" : 6,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 120.0, 494.0, 87.0 ],
					"text" : "A command line text editor (similar to the workflow of the terminal) for the opengl world of Max. Add the object to your setup and initialize it with the name of the render context. Then make sure you send it the render bang in the top inlet. The outlet outputs the typed text as a list that you can use in any way you like. To for example control parameters of gl objects, but it can also be used for controlling musical parameters, lighting shows, whatever you think of!",
					"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 40.0,
					"id" : "obj-22",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 45.0, 45.0, 367.0, 51.0 ],
					"text" : "th.gl.commandline",
					"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-20",
					"maxclass" : "newobj",
					"numinlets" : 0,
					"numoutlets" : 0,
					"patcher" : 					{
						"fileversion" : 1,
						"appversion" : 						{
							"major" : 8,
							"minor" : 0,
							"revision" : 8,
							"architecture" : "x64",
							"modernui" : 1
						}
,
						"classnamespace" : "box",
						"rect" : [ 100.0, 125.0, 861.0, 613.0 ],
						"bglocked" : 0,
						"openinpresentation" : 0,
						"default_fontsize" : 12.0,
						"default_fontface" : 0,
						"default_fontname" : "Arial",
						"gridonopen" : 1,
						"gridsize" : [ 15.0, 15.0 ],
						"gridsnaponopen" : 1,
						"objectsnaponopen" : 1,
						"statusbarvisible" : 2,
						"toolbarvisible" : 1,
						"lefttoolbarpinned" : 0,
						"toptoolbarpinned" : 0,
						"righttoolbarpinned" : 0,
						"bottomtoolbarpinned" : 0,
						"toolbars_unpinned_last_save" : 0,
						"tallnewobj" : 0,
						"boxanimatetime" : 200,
						"enablehscroll" : 1,
						"enablevscroll" : 1,
						"devicewidth" : 0.0,
						"description" : "",
						"digest" : "",
						"tags" : "",
						"style" : "",
						"subpatcher_template" : "",
						"showontab" : 1,
						"boxes" : [ 							{
								"box" : 								{
									"id" : "obj-40",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 428.0, 330.0, 70.0, 22.0 ],
									"text" : "r customize"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-37",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 363.0, 558.0, 150.0, 20.0 ],
									"text" : "view the code output"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-33",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 348.0, 552.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "6",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-32",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 285.0, 557.0, 70.0, 22.0 ],
									"text" : "print CODE"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-29",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 317.5, 463.0, 71.0, 22.0 ],
									"text" : "fromsymbol"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-18",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 317.5, 438.0, 25.0, 22.0 ],
									"text" : "iter"
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-23",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 796.0, 74.0, 54.0, 22.0 ],
									"text" : "onecopy"
								}

							}
, 							{
								"box" : 								{
									"attr" : "visible",
									"id" : "obj-26",
									"lock" : 1,
									"maxclass" : "attrui",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 255.0, 150.0, 22.0 ]
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-24",
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 735.0, 45.0, 238.0, 22.0 ],
									"text" : "loadunique th.gl.texteditor-example.maxpat"
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-20",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 735.0, 74.0, 51.0, 22.0 ],
									"text" : "pcontrol"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 0.949019607843137, 0.56078431372549, 0.094117647058824, 0.25 ],
									"bgoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"fontface" : 1,
									"id" : "obj-17",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 555.0, 45.0, 150.0, 60.0 ],
									"text" : "BIG EXAMPLE HERE!",
									"textoncolor" : [ 0.0, 0.0, 0.0, 1.0 ],
									"textovercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"truncate" : 0,
									"usetextovercolor" : 1
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-2",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 285.0, 527.0, 72.0, 22.0 ],
									"text" : "prepend set"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-16",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 30.0, 364.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "5",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-15",
									"linecount" : 12,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 374.0, 175.0, 167.0 ],
									"text" : "try the following code commands\n\nhit ALT + ENTER to execute\n\nw erase_color 0 0 0 0.7\ngs mesh auto_colors 1\ngs shape opencube\ngs anim turn 0.5 0.5 0.5\ngs mesh poly_mode 1 1\ngs mesh scale 0.5 0.5 10\ngs mesh draw_mode line_strip"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-39",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patcher" : 									{
										"fileversion" : 1,
										"appversion" : 										{
											"major" : 8,
											"minor" : 0,
											"revision" : 8,
											"architecture" : "x64",
											"modernui" : 1
										}
,
										"classnamespace" : "box",
										"rect" : [ 59.0, 104.0, 640.0, 480.0 ],
										"bglocked" : 0,
										"openinpresentation" : 0,
										"default_fontsize" : 12.0,
										"default_fontface" : 0,
										"default_fontname" : "Arial",
										"gridonopen" : 1,
										"gridsize" : [ 15.0, 15.0 ],
										"gridsnaponopen" : 1,
										"objectsnaponopen" : 1,
										"statusbarvisible" : 2,
										"toolbarvisible" : 1,
										"lefttoolbarpinned" : 0,
										"toptoolbarpinned" : 0,
										"righttoolbarpinned" : 0,
										"bottomtoolbarpinned" : 0,
										"toolbars_unpinned_last_save" : 0,
										"tallnewobj" : 0,
										"boxanimatetime" : 200,
										"enablehscroll" : 1,
										"enablevscroll" : 1,
										"devicewidth" : 0.0,
										"description" : "",
										"digest" : "",
										"tags" : "",
										"style" : "",
										"subpatcher_template" : "",
										"boxes" : [ 											{
												"box" : 												{
													"comment" : "",
													"id" : "obj-7",
													"index" : 1,
													"maxclass" : "outlet",
													"numinlets" : 1,
													"numoutlets" : 0,
													"patching_rect" : [ 108.0, 225.0, 30.0, 30.0 ]
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-6",
													"maxclass" : "toggle",
													"numinlets" : 1,
													"numoutlets" : 1,
													"outlettype" : [ "int" ],
													"parameter_enable" : 0,
													"patching_rect" : [ 108.0, 150.0, 24.0, 24.0 ]
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-4",
													"maxclass" : "message",
													"numinlets" : 2,
													"numoutlets" : 1,
													"outlettype" : [ "" ],
													"patching_rect" : [ 108.0, 180.0, 77.0, 22.0 ],
													"text" : "fullscreen $1"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-2",
													"maxclass" : "newobj",
													"numinlets" : 2,
													"numoutlets" : 2,
													"outlettype" : [ "bang", "" ],
													"patching_rect" : [ 108.0, 119.0, 41.0, 22.0 ],
													"text" : "sel 27"
												}

											}
, 											{
												"box" : 												{
													"id" : "obj-1",
													"maxclass" : "newobj",
													"numinlets" : 0,
													"numoutlets" : 4,
													"outlettype" : [ "int", "int", "int", "int" ],
													"patching_rect" : [ 108.0, 82.0, 50.5, 22.0 ],
													"text" : "key"
												}

											}
 ],
										"lines" : [ 											{
												"patchline" : 												{
													"destination" : [ "obj-2", 0 ],
													"source" : [ "obj-1", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-6", 0 ],
													"source" : [ "obj-2", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-7", 0 ],
													"source" : [ "obj-4", 0 ]
												}

											}
, 											{
												"patchline" : 												{
													"destination" : [ "obj-4", 0 ],
													"source" : [ "obj-6", 0 ]
												}

											}
 ]
									}
,
									"patching_rect" : [ 75.0, 285.0, 70.0, 22.0 ],
									"saved_object_attributes" : 									{
										"description" : "",
										"digest" : "",
										"globalpatchername" : "",
										"tags" : ""
									}
,
									"text" : "p fullscreen"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-38",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 555.0, 249.0, 178.0, 33.0 ],
									"text" : "use receives and route objects to define your own \"functions\""
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-36",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 540.0, 239.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "4",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-35",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 393.0, 491.0, 150.0, 33.0 ],
									"text" : "typ some text and press enter to output the \"code\""
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-31",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 378.0, 486.5, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "3",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-30",
									"linecount" : 2,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 345.0, 273.0, 135.0, 33.0 ],
									"text" : "focus on window / press esc for fullscreen"
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-28",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 466.5, 265.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "2",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"bgcolor" : [ 1.0, 0.788235, 0.470588, 1.0 ],
									"fontname" : "Arial Bold",
									"hint" : "",
									"id" : "obj-27",
									"ignoreclick" : 1,
									"legacytextcolor" : 1,
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 30.0, 193.0, 20.0, 20.0 ],
									"rounded" : 60.0,
									"text" : "1",
									"textcolor" : [ 0.34902, 0.34902, 0.34902, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-25",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 203.0, 90.0, 20.0 ],
									"text" : "turn world on"
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-95",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 735.0, 150.0, 300.0, 35.0 ],
									"text" : ";\rmax launchbrowser https://www.gumroad.com/tmhglnd"
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-66",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 735.0, 105.0, 317.0, 35.0 ],
									"text" : ";\rmax launchbrowser http://www.patreon.com/timohoogland"
								}

							}
, 							{
								"box" : 								{
									"align" : 0,
									"bgcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.2 ],
									"bgoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"fontface" : 1,
									"id" : "obj-67",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 555.0, 120.0, 150.0, 23.0 ],
									"text" : "support me on patreon",
									"textjustification" : 0,
									"textoncolor" : [ 0.0, 0.0, 0.0, 1.0 ],
									"textovercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"usetextovercolor" : 1
								}

							}
, 							{
								"box" : 								{
									"hidden" : 1,
									"id" : "obj-68",
									"linecount" : 2,
									"maxclass" : "message",
									"numinlets" : 2,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 735.0, 195.0, 275.0, 35.0 ],
									"text" : ";\rmax launchbrowser http://www.timohoogland.com"
								}

							}
, 							{
								"box" : 								{
									"align" : 0,
									"bgcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.2 ],
									"bgoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"fontface" : 1,
									"id" : "obj-69",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 555.0, 180.0, 150.0, 23.0 ],
									"text" : "go to my website",
									"textjustification" : 0,
									"textoncolor" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
									"textovercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"usebgoncolor" : 1,
									"usetextovercolor" : 1
								}

							}
, 							{
								"box" : 								{
									"align" : 0,
									"bgcolor" : [ 0.996078431372549, 0.996078431372549, 0.996078431372549, 0.2 ],
									"bgoncolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"fontface" : 1,
									"id" : "obj-72",
									"maxclass" : "textbutton",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "", "int" ],
									"parameter_enable" : 0,
									"patching_rect" : [ 555.0, 150.0, 150.0, 23.0 ],
									"text" : "visit my gumroad",
									"textjustification" : 0,
									"textoncolor" : [ 0.239216, 0.254902, 0.278431, 1.0 ],
									"textovercolor" : [ 1.0, 1.0, 1.0, 1.0 ],
									"usebgoncolor" : 1,
									"usetextovercolor" : 1
								}

							}
, 							{
								"box" : 								{
									"fontface" : 1,
									"fontsize" : 12.0,
									"id" : "obj-21",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 98.0, 367.0, 20.0 ],
									"text" : "written by Timo Hoogland © 2020, www.timohoogland.com"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-88",
									"linecount" : 5,
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 120.0, 495.0, 74.0 ],
									"text" : "A basic code text-editor for the opengl world of Max. Add the object to your setup and initialize it with the name of the render context. Make sure you send it the render bang in the top inlet. The outlet outputs the parsed text as a list of symbols that you can use in any way you like. For example control parameters of gl objects, control musical parameters, lighting shows, just use it as a typewriter or whatever you think of!",
									"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"fontface" : 0,
									"fontname" : "Arial",
									"fontsize" : 40.0,
									"id" : "obj-22",
									"maxclass" : "comment",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 45.0, 45.0, 367.0, 51.0 ],
									"text" : "th.gl.texteditor",
									"textcolor" : [ 0.32548999786377, 0.345097988843918, 0.372548997402191, 1.0 ]
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-14",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 601.0, 404.0, 69.0, 22.0 ],
									"text" : "route mesh"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-13",
									"maxclass" : "newobj",
									"numinlets" : 9,
									"numoutlets" : 2,
									"outlettype" : [ "jit_matrix", "" ],
									"patching_rect" : [ 555.0, 524.0, 211.0, 22.0 ],
									"text" : "jit.gl.mesh help-ctx @scale 0.4 0.4 0.4"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-12",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 555.0, 344.0, 65.0, 22.0 ],
									"text" : "route anim"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-11",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 555.0, 374.0, 76.0, 22.0 ],
									"text" : "jit.anim.drive"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-9",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 555.0, 284.0, 64.0, 22.0 ],
									"text" : "r codeText"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-10",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 555.0, 314.0, 52.0, 22.0 ],
									"text" : "route gs"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-8",
									"maxclass" : "newobj",
									"numinlets" : 0,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 222.0, 255.0, 64.0, 22.0 ],
									"text" : "r codeText"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-7",
									"maxclass" : "newobj",
									"numinlets" : 2,
									"numoutlets" : 2,
									"outlettype" : [ "", "" ],
									"patching_rect" : [ 222.0, 285.0, 48.0, 22.0 ],
									"text" : "route w"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-6",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 0,
									"patching_rect" : [ 317.5, 491.0, 66.0, 22.0 ],
									"text" : "s codeText"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-5",
									"linecount" : 2,
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 2,
									"outlettype" : [ "jit_matrix", "" ],
									"patching_rect" : [ 651.0, 434.0, 165.0, 35.0 ],
									"text" : "jit.gl.gridshape help-ctx @matrixoutput 1 @dim 50 50"
								}

							}
, 							{
								"box" : 								{
									"color" : [ 0.952941, 0.564706, 0.098039, 1.0 ],
									"id" : "obj-4",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 285.0, 374.0, 183.0, 22.0 ],
									"text" : "th.gl.texteditor help-ctx 1280 720"
								}

							}
, 							{
								"box" : 								{
									"id" : "obj-1",
									"maxclass" : "newobj",
									"numinlets" : 1,
									"numoutlets" : 3,
									"outlettype" : [ "", "bang", "" ],
									"patching_rect" : [ 45.0, 330.0, 373.0, 22.0 ],
									"text" : "jit.world help-ctx @fsaa 1 @fsmenubar 0 @size 480 270 @floating 1"
								}

							}
, 							{
								"box" : 								{
									"attr" : "enable",
									"id" : "obj-3",
									"lock" : 1,
									"maxclass" : "attrui",
									"numinlets" : 1,
									"numoutlets" : 1,
									"outlettype" : [ "" ],
									"patching_rect" : [ 45.0, 225.0, 150.0, 22.0 ]
								}

							}
 ],
						"lines" : [ 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-1", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-12", 0 ],
									"source" : [ "obj-10", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-13", 0 ],
									"source" : [ "obj-11", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-11", 0 ],
									"source" : [ "obj-12", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-14", 0 ],
									"source" : [ "obj-12", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-13", 0 ],
									"source" : [ "obj-14", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-5", 0 ],
									"source" : [ "obj-14", 1 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-24", 0 ],
									"hidden" : 1,
									"source" : [ "obj-17", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-29", 0 ],
									"source" : [ "obj-18", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-32", 0 ],
									"source" : [ "obj-2", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-20", 0 ],
									"hidden" : 1,
									"source" : [ "obj-24", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-26", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-6", 0 ],
									"source" : [ "obj-29", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-3", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-39", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-18", 0 ],
									"order" : 0,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-2", 0 ],
									"order" : 1,
									"source" : [ "obj-4", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-4", 0 ],
									"source" : [ "obj-40", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-13", 0 ],
									"source" : [ "obj-5", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-66", 0 ],
									"hidden" : 1,
									"source" : [ "obj-67", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-68", 0 ],
									"hidden" : 1,
									"source" : [ "obj-69", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-1", 0 ],
									"source" : [ "obj-7", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-95", 0 ],
									"hidden" : 1,
									"source" : [ "obj-72", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-7", 0 ],
									"source" : [ "obj-8", 0 ]
								}

							}
, 							{
								"patchline" : 								{
									"destination" : [ "obj-10", 0 ],
									"source" : [ "obj-9", 0 ]
								}

							}
 ]
					}
,
					"patching_rect" : [ 45.0, 255.0, 47.0, 22.0 ],
					"saved_object_attributes" : 					{
						"description" : "",
						"digest" : "",
						"globalpatchername" : "",
						"tags" : ""
					}
,
					"text" : "p basic"
				}

			}
 ],
		"lines" : [  ],
		"dependency_cache" : [ 			{
				"name" : "th.gl.texteditor.maxpat",
				"bootpath" : "~/Documents/Max 7/Library/abstractions/th.gl.texteditor/patchers",
				"patcherrelativepath" : "../patchers",
				"type" : "JSON",
				"implicit" : 1
			}
, 			{
				"name" : "th.gl.editor.js",
				"bootpath" : "~/Documents/Max 7/Library/abstractions/th.gl.texteditor/code",
				"patcherrelativepath" : "../code",
				"type" : "TEXT",
				"implicit" : 1
			}
, 			{
				"name" : "ease.mxo",
				"type" : "iLaX"
			}
 ],
		"autosave" : 0,
		"styles" : [ 			{
				"name" : "AudioStatus_Menu",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "color",
						"color" : [ 0.294118, 0.313726, 0.337255, 1 ],
						"color1" : [ 0.454902, 0.462745, 0.482353, 0.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39,
						"autogradient" : 0
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
, 			{
				"name" : "Audiomix",
				"default" : 				{
					"bgfillcolor" : 					{
						"type" : "gradient",
						"color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
						"color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
						"angle" : 270.0,
						"proportion" : 0.39
					}

				}
,
				"parentstyle" : "",
				"multi" : 0
			}
 ]
	}

}
