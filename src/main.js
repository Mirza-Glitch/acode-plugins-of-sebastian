import plugin from '../plugin.json';
import style from './styles/style.scss';
const toast = acode.require('toast');;

class bulma {

  async fetch_bulma() {
    try {
      const response = await fetch(plugin.url);
      const extractedCss = await response.text();
      const classRegex = /\.(?!\d)([\w-]+)/g;
      const classes = new Set();
      let match;
      while ((match = classRegex.exec(extractedCss))) {
        classes.add(match[1]);
      }
      return Array.from(classes);
    } catch (err) {
      acode.alert(err.message);
      return [];
    }
  }

  Autocompletion(classes) {
    let staticWordCompleter = {
      getCompletions: (editor, session, pos, prefix, callback) => {
        if (session.getMode().$id === 'ace/mode/html' || session.getMode().$id === 'ace/mode/jsx') {
          let line = session.getLine(pos.row).substr(0, pos.column);
          if (line.includes('class="') || line.includes('className="')) {
    callback(null, classes.map(function (word) {
      return {
        caption: word,
        value: word,
        meta: "bulma"
      };
    }));
    return;
          } else {
    callback(null, []);
          }
        }
        callback(null, []);
      }
    };
    editorManager.editor.completers.unshift(staticWordCompleter);
  };

  async init(cacheFileUrl, cacheFile) {

    this.style = <style textContent={style}></style>;
    document.head.append(this.style);
    
  const bulma_classes = await cacheFile?.readFile('utf8');
  
  if (bulma_classes) (this.Autocompletion(JSON.parse(bulma_classes)));
    
  const classes = await this.fetch_bulma();
  await cacheFile?.writeFile(JSON.stringify(classes));
  this.Autocompletion(classes);
  this.$cacheFile = cacheFile;
    
  };
  
  async clear() {
   await this.$cacheFile?.writeFile("");
   toast('Bulma plugin cache was successfully cleared!', 3000)
  };
  
  get config() {
    return { 
      list: [{ 
        key: "bulma_clear", 
        text: "Clear Cache", 
        info: "Remove cache the bulma from acode" }], 
      cb: (key, value) => { 
        this.clear();
      }
    }
  };
  
  async destroy() {
    this.clear();
    this.Autocompletion([]);
    this.style?.remove();
  };
};

if (window.acode) {

  acode.setPluginInit(plugin.id, ({ cacheFileUrl, cacheFile }) => new bulma().init(cacheFileUrl, cacheFile), new bulma().config);

  acode.setPluginUnmount(plugin.id, () => new bulma().destroy());

};