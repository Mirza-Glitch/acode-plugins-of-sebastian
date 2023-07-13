import plugin from '../plugin.json';
const themes = acode.require('themes');
const ThemeBuilder = acode.require('themeBuilder');

class theme {

  async init() {

  this.setup_theme_purple_dark('Theme Visual Studio');
  
  this.setup_theme_dracula('Visual Studio Dracula')

 };

  async destroy() {};
  
  async setup_theme_purple_dark(name) {
 
  const purple_dark = new ThemeBuilder(name, 'dark', 'free');
    
  purple_dark.primaryColor = '#191D24';
  purple_dark.popupBackgroundColor = '#24292e';
  purple_dark.darkenedPrimaryColor = '#191D24';
  purple_dark.primaryTextColor = '#ffffff';
  purple_dark.secondaryColor = '#24292eff';
  purple_dark.secondaryTextColor = '#ffffff';
  purple_dark.activeColor = '#c306ffbb';
  purple_dark.activeIconColor = '#9313f6';
  purple_dark.linkTextColor = '#9313f6';
  purple_dark.errorTextColor = '#f97583';
  purple_dark.scrollbarColor = '#30363d';
  purple_dark.borderColor = '#30363d';
  purple_dark.popupBorderColor = '#30363d';
  purple_dark.borderRadius = '4px';
  purple_dark.popupBorderRadius = '4px';
  purple_dark.popupIconColor = '#ffffff';
  purple_dark.popupTextColor = '#ffffff';
  purple_dark.popupActiveColor = '#e6fa10';
  purple_dark.boxShadowColor = '#00000033';
  purple_dark.buttonActiveColor = '#9313f6';
  purple_dark.buttonBackgroundColor = '#9313f6';
  purple_dark.buttonTextColor = '#ffffff'; 
    
  themes.add(purple_dark);
  themes.apply(name);
  
  };
  
  async setup_theme_dracula(name) {
 
  const dracula = new ThemeBuilder(name, 'dark', 'free');
   
    dracula.primaryColor = '#282a36';
    dracula.popupBackgroundColor = '#282a36';
    dracula.darkenedPrimaryColor = '#282a36';
    dracula.primaryTextColor = '#f8f8f2';
    dracula.secondaryColor = '#44475a';
    dracula.secondaryTextColor = '#f8f8f2';
    dracula.activeColor = '#ff79c6';
    dracula.activeIconColor = '#6d0fe9c6';
    dracula.linkTextColor = '#8be9fd';
    dracula.errorTextColor = '#ff5555';
    dracula.scrollbarColor = '#6272a4';
    dracula.borderColor = '#6272a4';
    dracula.popupBorderColor = '#6272a4';
    dracula.borderRadius = '3px';
    dracula.popupBorderRadius = '3px';
    dracula.popupIconColor = '#bd93f9';
    dracula.popupTextColor = '#f8f8f2';
    dracula.popupActiveColor = '#f5ff28';
    dracula.boxShadowColor = '#00000033';
    dracula.buttonActiveColor = '#6d0fe992';
    dracula.buttonBackgroundColor = '#6d0fe9c6';
    dracula.buttonTextColor = '#f8f8f2';

    themes.add(dracula);
    themes.apply(name);
};

}

if (window.acode) {
    const _theme = new theme();
    acode.setPluginInit(plugin.id, (baseUrl, $page, {
        cacheFileUrl, cacheFile
    }) => {
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        _theme.baseUrl = baseUrl;
        _theme.init($page, cacheFile, cacheFileUrl);
    });
    acode.setPluginUnmount(plugin.id, () => {
        _theme.destroy();
    });
}