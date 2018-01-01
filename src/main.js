const { OPTIONS } = require('./const');

const lexicalAnalysis = require('./lexicalAnalyser');

function syntaxAnalysisPhase(expression) {
    const regex = /([\s\>\+\~])|([#.]?[:]{0,2}\S+?(?=[#.:\s\~\+\>\[]))|([#.]?\S+?$)/g;
    const rawSyntaxTree = [], abstractSyntaxTree = [];
    let m;

    while ((m = regex.exec(expression)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `m`-variable. ws
        m.forEach((match, groupIndex) => {
            if (groupIndex && match !== undefined) {
                // console.log(`Found match, group ${groupIndex}: ${match}`);
                rawSyntaxTree.push(match);
                abstractSyntaxTree.push(lexicalAnalysis(match));
            }
        });
    }

    return abstractSyntaxTree;
}

function dfi(domCollection) {
    let domList = [];

    domCollection.forEach(function (dom, index) {

        domList.push(dom);

        if (dom.childNodes.length) {
            domList = domList.concat(dfi(dom.childNodes));
        }
    });

    return domList;
}

function execute(abstractSyntaxTree, initialDomCollection) {
    console.log(initialDomCollection);

    let targetDomCollection = initialDomCollection;

    abstractSyntaxTree.forEach((node, index) => {
        console.log(index, node);
        switch (node.type) {
            case OPTIONS.MATCH_ELEMENT:
                dfi(targetDomCollection).forEach(function (dom) {
                    if (dom.nodeName === 'DIV') {
                        console.log(dom);
                    }
                });
                break;
        }
    });
}

function parse(expression) {
    return syntaxAnalysisPhase(expression);
}

module.exports = function (expression, initialDomCollection) {
    return execute(parse(expression), initialDomCollection);
}