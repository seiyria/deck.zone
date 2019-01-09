
import grammar from './decklang';
import nearley from 'nearley';

const parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);

export default () => {
  onmessage = (msg) => {
    try {
      postMessage(parser.feed(msg.data).results);
    } catch(e) {
      postMessage({ error: { offset: e.offset } });
    }
  };
}