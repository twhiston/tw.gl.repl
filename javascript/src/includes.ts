import { GLRender } from "GLRender";
import { REPLManager, REPLSettings } from 'REPLManager';
import { BraceBalancedFormatter } from "BraceBalancedFormatter";
import { WhitespaceFormatter } from "WhitespaceFormatter";
import { SingleLineOutputFormatter } from "SingleLineOutputFormatter";
import { CommentRemoverFormatter } from "CommentRemoverFormatter";

//preload all our formatters
const bbf = new BraceBalancedFormatter(true);
const wsf = new WhitespaceFormatter();
const slf = new SingleLineOutputFormatter("");
const crf = new CommentRemoverFormatter();

exports.renderer = new GLRender(Date.now());
exports.manager = new REPLManager(new REPLSettings(), [], [wsf, bbf, slf, crf]);
