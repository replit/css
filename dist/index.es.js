import { ExternalTokenizer, LRParser } from '@lezer/lr';
import { NodeProp } from '@lezer/common';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const descendantOp = 94,
  Unit = 1,
  callee = 95,
  identifier = 96,
  VariableName = 2;

/* Hand-written tokenizers for CSS tokens that can't be
   expressed by Lezer's built-in tokenizer. */

const space = [9, 10, 11, 12, 13, 32, 133, 160, 5760, 8192, 8193, 8194, 8195, 8196, 8197,
               8198, 8199, 8200, 8201, 8202, 8232, 8233, 8239, 8287, 12288];
const colon = 58, parenL = 40, underscore = 95, bracketL = 91, dash = 45, period = 46,
      hash = 35, percent = 37;

function isAlpha(ch) { return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122 || ch >= 161 }

function isDigit(ch) { return ch >= 48 && ch <= 57 }

const identifiers = new ExternalTokenizer((input, stack) => {
  for (let inside = false, dashes = 0, i = 0;; i++) {
    let {next} = input;
    if (isAlpha(next) || next == dash || next == underscore || (inside && isDigit(next))) {
      if (!inside && (next != dash || i > 0)) inside = true;
      if (dashes === i && next == dash) dashes++;
      input.advance();
    } else {
      if (inside)
        input.acceptToken(next == parenL ? callee : dashes == 2 && stack.canShift(VariableName) ? VariableName : identifier);
      break
    }
  }
});

const descendant = new ExternalTokenizer(input => {
  if (space.includes(input.peek(-1))) {
    let {next} = input;
    if (isAlpha(next) || next == underscore || next == hash || next == period ||
        next == bracketL || next == colon || next == dash)
      input.acceptToken(descendantOp);
  }
});

const unitToken = new ExternalTokenizer(input => {
  if (!space.includes(input.peek(-1))) {
    let {next} = input;
    if (next == percent) { input.advance(); input.acceptToken(Unit); }
    if (isAlpha(next)) {
      do { input.advance(); } while (isAlpha(input.next))
      input.acceptToken(Unit);
    }
  }
});

// This file was generated by lezer-generator. You probably shouldn't edit it.
const spec_callee = {__proto__:null,lang:32, "nth-child":32, "nth-last-child":32, "nth-of-type":32, dir:32, url:60, "url-prefix":60, domain:60, regexp:60, selector:134};
const spec_AtKeyword = {__proto__:null,"@import":114, "@media":138, "@charset":142, "@namespace":146, "@keyframes":152, "@supports":164};
const spec_identifier = {__proto__:null,not:128, only:128, from:158, to:160};
const parser = LRParser.deserialize({
  version: 13,
  states: "7vO!^Q[OOO!eQXO'#CdOOQP'#Cc'#CcO#YQ[O'#CfO#|QXO'#CaO$TQ[O'#ChO$`Q[O'#DPO$eQ[O'#DTOOQP'#Ed'#EdO$jQWO'#DaO$oQdO'#DeO%ZQ[O'#DrO$oQdO'#DtO%lQ[O'#DvO%wQ[O'#DyO%|Q[O'#EPO&[Q[O'#EROOQS'#Ec'#EcOOQS'#ET'#ETQ&cQ[O'#ESO&jQWO'#ESQOQWOOOOQP'#Cg'#CgOOQP,59Q,59QO#YQ[O,59QO&rQ[O'#EWO'^QWO,58{O'fQ[O,59SO$`Q[O,59kO$eQ[O,59oO&rQ[O,59sO&rQ[O,59uO&rQ[O,59vO'qQ[O'#D`OOQS,58{,58{OOQP'#Ck'#CkOOQO'#C}'#C}OOQP,59S,59SO'xQWO,59SO'}QWO,59SOOQP'#DR'#DROOQP,59k,59kOOQO'#DV'#DVO(SQ`O,59oO$oQdO,59{OOQS'#Cp'#CpO$oQdO'#CqO([QvO'#CsO)iQtO,5:POOQO'#Cx'#CxO'xQWO'#CwO)}QWO'#CyOOQS'#Eg'#EgOOQO'#Dh'#DhO*SQ[O'#DoO*bQWO'#EjO%|Q[O'#DmO*pQWO'#DpOOQO'#Ek'#EkO'aQWO,5:^O*uQpO,5:`OOQS'#Dx'#DxO*}QWO,5:bO+SQ[O,5:bOOQO'#D{'#D{O+[QWO,5:eO+aQWO,5:kO+iQWO,5:mOOQS-E8R-E8RO+qQWO,5:nO+yQ[O'#EYO+qQWO,5:nOOQP1G.l1G.lOOQP'#Cd'#CdO,rQXO,5:rOOQO-E8U-E8UOOQS1G.g1G.gOOQP1G.n1G.nO'xQWO1G.nO'}QWO1G.nOOQP1G/V1G/VO-PQ`O1G/ZO-jQXO1G/_O.QQXO1G/aO.hQXO1G/bOOQS,59z,59zO/OQWO,59zO/WQ[O,59zO/_QdO'#CoO/fQ[O'#DOOOQP1G/Z1G/ZO$oQdO1G/ZO/mQtO1G/gO0TQpO,59]OOQS,59_,59_O$oQdO,59aO0]QWO1G/kOOQS,59c,59cO0bQ!bO,59eO0jQWO'#DhO0uQWO,5:TO0zQWO,5:ZO%|Q[O,5:VO%|Q[O'#EZO1SQWO,5;UO1_QWO,5:XO&rQ[O,5:[OOQS1G/x1G/xOOQS1G/z1G/zOOQS1G/|1G/|O1pQWO1G/|O1uQdO'#D|OOQS1G0P1G0POOQS1G0V1G0VOOQS1G0X1G0XO2TQWO1G0YOOQO,5:t,5:tO2]Q[O,5:tOOQO-E8W-E8WOOQP7+$Y7+$YOOQP7+$u7+$uO$oQdO7+$uO2jQWO1G/fOOQS1G/f1G/fO2jQWO1G/fO2rQtO'#EUO3gQdO'#EfO3qQWO,59ZO3vQXO'#EiO3}QWO,59jO4SQpO7+$uO4[QtO'#EXO$oQdO'#EXO5YQdO7+%ROOQO7+%R7+%ROOQS1G.w1G.wOOQS1G.{1G.{OOQS7+%V7+%VO5mQWO1G/PO$oQdO1G/oOOQO1G/u1G/uOOQO1G/q1G/qO5rQWO,5:uOOQO-E8X-E8XO6QQXO1G/vOOQS7+%h7+%hO6XQYO'#CsO'aQWO'#E[O6aQdO,5:hOOQS,5:h,5:hOOQO1G0`1G0`O6oQpO<<HaOOQS7+%Q7+%QO6wQWO7+%QOOQS-E8S-E8SO$oQdO'#EVO7PQWO,5;QOOQT1G.u1G.uO7XQWO,5;TOOQP1G/U1G/UOOQP<<Ha<<HaO7aQtO,5:sOOQS-E8V-E8VOOQO<<Hm<<HmOOQS7+$k7+$kO8_QdO7+%ZOOQO7+%b7+%bOOQS,5:v,5:vOOQS-E8Y-E8YOOQS1G0S1G0SOOQPAN={AN={OOQS<<Hl<<HlO8fQdO,5:qOOQO-E8T-E8TOOQO<<Hu<<Hu",
  stateData: "8v~O#UOSROS~OQXOUWOXWO]TO^TOtUOxVO!Y`O!ZYO!gZO!i[O!k]O!n^O!t_O#SPO#XRO~O#P!vP~PYO]WX]!UX^WXpWXtWXxWX|WX!PWX!RWX#QWX#XWX~O#SfO~O]kO^kOpiOtlOxmO|nO!PpO#QoO#XhO~O!RqO~P#_O`vO#RtO#SsO~O#SxO~O#SzO~O]|O~OQ!UOb!OOf!UOh!UOn!TO#R!RO#S}O#[!PO~Ob!WO!b!YO!e!ZO#S!VO!R#^P~Oh!`On!TO#S!_O~O#S!bO~Ob!WO!b!YO!e!ZO#S!VO~O!W#^P~P%ZO#P!vX~PYO!W!hO#P!vX~OUWOXWO]TO^TOtUOxVO#S!kO#XRO~OpiO!RqO~O`!pO#RtO#SsO~O!Q!wO~PYOb!zO~Ob!{O~Ov!|Oz!}O~OP#QObgXjgX!WgX!bgX!egX#SgXQgXfgXhgXngXpgX!VgX#PgX#RgX#[gXagXvgX!QgX~Ob!WOj#RO!b!YO!e!ZO#S!VO!W#^P~Ob#UO~Ob!WO!b!YO!e!ZO#S#VO~Op#ZO!`#YO!R#^X!W#^X~Ob#^O~Oj#RO!W#`O~O!W#aO~Oh#bOn!TO~O!R#cO~O!RqO!`#YO~O!RqO!W#fO~O!W!hO#P!va~O!W!|X#P!|X!Q!|X~PYO]kO^kOtlOxmO|nO!PpO#QoO#XhO~Op!za!R!zaa!za~P,WOv#lOz#mO~O]kO^kOtlOxmO#XhO~Op{i|{i!P{i!R{i#Q{ia{i~P-XOp}i|}i!P}i!R}i#Q}ia}i~P-XOp!Oi|!Oi!P!Oi!R!Oi#Q!Oia!Oi~P-XO!Q#oO!W!hO~O!Q#oO~PYOa#YP~P$oOa#]P~P&rOj#ROp#xO!V#zO!W!Ti#P!Ti!Q!Ti~P$oOa#{Oj#RO~O!W#}O~Oh$OOo$OO~O]!^Xa![X!`![X~O]$PO~Oa$QO!`#YO~Op#ZO!R#^a!W#^a~O!`#YOp!aa!R!aa!W!aaa!aa~O!W$VO~O!Q$ZO!q$XO!r$XO#[$WO~O!W!hO#P!vi~O!W!|a#P!|a!Q!|a~PYO!Q$^O!W!hO~Oj#ROQ!xXa!xXb!xXf!xXh!xXn!xXp!xX#R!xX#S!xX#[!xX~Op$aOa#YX~P$oOa$cO~Oa#]X~P#_Oa$eO~Oj#ROv$fO~Oj#ROQ!{Xb!{Xf!{Xh!{Xn!{Xp!{X!V!{X!W!{X#P!{X#R!{X#S!{X#[!{X!Q!{X~Op#xO!V$iO!W!Tq#P!Tq!Q!Tq~P$oOa$jO~O!`#YOp!}a!R!}a!W!}a~Oa$lO~P,WOP#QO!RgX~O!Q$oO!q$XO!r$XO#[$WO~Oj#ROv$pO~O!Q$qO!W!hO~Op$aOa#Ya~OpiOa#]a~Oj#ROQ!{ab!{af!{ah!{an!{ap!{a!V!{a!W!{a#P!{a#R!{a#S!{a#[!{a!Q!{a~Oa$tO~P$oOa!yap!ya~P$oOo#[j!Pj~",
  goto: ",d#`PPPPP#aP#i#wP#i$V#iPP$]PPP$c$l$lP%OP$lP$l%f%xPPP&b&h#iP&nP#iP&tP#iP#i#iPPP&z'^'pPP#aPP'x'x(S'xP'xP'x'xP#aP#aP#aP(V#aP(Y(]PP#aP#a(`(c(q)P)V)a)g)y*PPPPPPP*V*_P*y*|P+r+u,O]aOcq!h!y#iiWOcinopq!h!y!{#^#iiQOcinopq!h!y!{#^#iQgRR!jhQuTR!okQ!ovQ#T!SR#k!pq!UY[|!O!z!}#O#R#m#r#x#y$P$a$k$rp!UY[|!O!z!}#O#R#m#r#x#y$P$a$k$rT$X#c$Yq!SY[|!O!z!}#O#R#m#r#x#y$P$a$k$rp!UY[|!O!z!}#O#R#m#r#x#y$P$a$k$rQ!`]R#b!aQwTR!qkQ!owR#k!qQyUR!rlQ{VR!smQrSQ!njQ#_!]Q#e!dQ#f!eR$m$XQdOQ!gcQ!xqQ#h!hQ#p!yR$[#i]XOcq!h!y#ia![Z_`!Q!W!Y#Y#ZR#W!WR!a]R!c^R#d!cReOQcOU!fc!y#iQ!yqR#i!hQ#r!zU$`#r$k$rQ$k$PR$r$aQ$b#rR$s$bQjSS!mj$dR$d#tQ#y#OR$h#yQ!idQ#g!gW#j!i#g#n$_Q#n!xR$_#pQ#[!XR$T#[Q$Y#cR$n$Y]bOcq!h!y#i[SOcq!h!y#iQ!liQ!tnQ!uoQ!vpQ#t!{R$U#^R#s!zQ!QYQ!^[Q#O|Q#P!O[#q!z#r$P$a$k$rQ#v!}S#w#O#yQ#|#RQ$]#mR$g#xR#u!{Q!]ZQ!e`R#S!QU!XZ`!QQ!d_Q#X!WQ#]!YQ$R#YR$S#Z",
  nodeNames: "⚠ Unit VariableName Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NestingSelector ClassSelector ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee CallLiteral CallTag ParenthesizedContent , PseudoClassName ArgList IdSelector # IdName ] AttributeSelector [ AttributeName MatchOp ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp } { Block Declaration PropertyName Important ; ImportStatement AtKeyword import KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList from to SupportsStatement supports AtRule ItemSet",
  maxTerm: 107,
  nodeProps: [
    [NodeProp.openedBy, 17,"(",48,"{"],
    [NodeProp.closedBy, 18,")",49,"}"]
  ],
  skippedNodes: [0,3],
  repeatNodeCount: 8,
  tokenData: "Ay~R![OX$wX^%]^p$wpq%]qr(crs+}st,otu2Uuv$wvw2rwx2}xy3jyz3uz{3z{|4_|}8U}!O8a!O!P8x!P!Q9Z!Q![;e![!]<Y!]!^<x!^!_$w!_!`=T!`!a=`!a!b$w!b!c>O!c!}$w!}#O?[#O#P$w#P#Q?g#Q#R2U#R#T$w#T#U?r#U#c$w#c#d@q#d#o$w#o#pAQ#p#q2U#q#rA]#r#sAh#s#y$w#y#z%]#z$f$w$f$g%]$g#BY$w#BY#BZ%]#BZ$IS$w$IS$I_%]$I_$I|$w$I|$JO%]$JO$JT$w$JT$JU%]$JU$KV$w$KV$KW%]$KW&FU$w&FU&FV%]&FV~$wW$zQOy%Qz~%QW%VQoWOy%Qz~%Q~%bf#U~OX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q~&}f#U~oWOX%QX^&v^p%Qpq&vqy%Qz#y%Q#y#z&v#z$f%Q$f$g&v$g#BY%Q#BY#BZ&v#BZ$IS%Q$IS$I_&v$I_$I|%Q$I|$JO&v$JO$JT%Q$JT$JU&v$JU$KV%Q$KV$KW&v$KW&FU%Q&FU&FV&v&FV~%Q^(fSOy%Qz#]%Q#]#^(r#^~%Q^(wSoWOy%Qz#a%Q#a#b)T#b~%Q^)YSoWOy%Qz#d%Q#d#e)f#e~%Q^)kSoWOy%Qz#c%Q#c#d)w#d~%Q^)|SoWOy%Qz#f%Q#f#g*Y#g~%Q^*_SoWOy%Qz#h%Q#h#i*k#i~%Q^*pSoWOy%Qz#T%Q#T#U*|#U~%Q^+RSoWOy%Qz#b%Q#b#c+_#c~%Q^+dSoWOy%Qz#h%Q#h#i+p#i~%Q^+wQ!VUoWOy%Qz~%Q~,QUOY+}Zr+}rs,ds#O+}#O#P,i#P~+}~,iOh~~,lPO~+}_,tWtPOy%Qz!Q%Q!Q![-^![!c%Q!c!i-^!i#T%Q#T#Z-^#Z~%Q^-cWoWOy%Qz!Q%Q!Q![-{![!c%Q!c!i-{!i#T%Q#T#Z-{#Z~%Q^.QWoWOy%Qz!Q%Q!Q![.j![!c%Q!c!i.j!i#T%Q#T#Z.j#Z~%Q^.qWfUoWOy%Qz!Q%Q!Q![/Z![!c%Q!c!i/Z!i#T%Q#T#Z/Z#Z~%Q^/bWfUoWOy%Qz!Q%Q!Q![/z![!c%Q!c!i/z!i#T%Q#T#Z/z#Z~%Q^0PWoWOy%Qz!Q%Q!Q![0i![!c%Q!c!i0i!i#T%Q#T#Z0i#Z~%Q^0pWfUoWOy%Qz!Q%Q!Q![1Y![!c%Q!c!i1Y!i#T%Q#T#Z1Y#Z~%Q^1_WoWOy%Qz!Q%Q!Q![1w![!c%Q!c!i1w!i#T%Q#T#Z1w#Z~%Q^2OQfUoWOy%Qz~%QY2XSOy%Qz!_%Q!_!`2e!`~%QY2lQzQoWOy%Qz~%QX2wQXPOy%Qz~%Q~3QUOY2}Zw2}wx,dx#O2}#O#P3d#P~2}~3gPO~2}_3oQbVOy%Qz~%Q~3zOa~_4RSUPjSOy%Qz!_%Q!_!`2e!`~%Q_4fUjS!PPOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q^4}SoWOy%Qz!Q%Q!Q![5Z![~%Q^5bWoW#[UOy%Qz!Q%Q!Q![5Z![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q^6PWoWOy%Qz{%Q{|6i|}%Q}!O6i!O!Q%Q!Q![6z![~%Q^6nSoWOy%Qz!Q%Q!Q![6z![~%Q^7RSoW#[UOy%Qz!Q%Q!Q![6z![~%Q^7fYoW#[UOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%Q_8ZQpVOy%Qz~%Q^8fUjSOy%Qz!O%Q!O!P4x!P!Q%Q!Q![7_![~%Q_8}S#XPOy%Qz!Q%Q!Q![5Z![~%Q~9`RjSOy%Qz{9i{~%Q~9nSoWOy9iyz9zz{:o{~9i~9}ROz9zz{:W{~9z~:ZTOz9zz{:W{!P9z!P!Q:j!Q~9z~:oOR~~:tUoWOy9iyz9zz{:o{!P9i!P!Q;W!Q~9i~;_QoWR~Oy%Qz~%Q^;jY#[UOy%Qz!O%Q!O!P5Z!P!Q%Q!Q![7_![!g%Q!g!h5z!h#X%Q#X#Y5z#Y~%QX<_S]POy%Qz![%Q![!]<k!]~%QX<rQ^PoWOy%Qz~%Q_<}Q!WVOy%Qz~%QY=YQzQOy%Qz~%QX=eS|POy%Qz!`%Q!`!a=q!a~%QX=xQ|PoWOy%Qz~%QX>RUOy%Qz!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX>lY!YPoWOy%Qz}%Q}!O>e!O!Q%Q!Q![>e![!c%Q!c!}>e!}#T%Q#T#o>e#o~%QX?aQxPOy%Qz~%Q^?lQvUOy%Qz~%QX?uSOy%Qz#b%Q#b#c@R#c~%QX@WSoWOy%Qz#W%Q#W#X@d#X~%QX@kQ!`PoWOy%Qz~%QX@tSOy%Qz#f%Q#f#g@d#g~%QXAVQ!RPOy%Qz~%Q_AbQ!QVOy%Qz~%QZAmS!PPOy%Qz!_%Q!_!`2e!`~%Q",
  tokenizers: [descendant, unitToken, identifiers, 0, 1, 2, 3],
  topRules: {"StyleSheet":[0,4]},
  specialized: [{term: 95, get: value => spec_callee[value] || -1},{term: 56, get: value => spec_AtKeyword[value] || -1},{term: 96, get: value => spec_identifier[value] || -1}],
  tokenPrec: 1090
});

export { parser };
