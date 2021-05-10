export const TOAST_DEFAULT_TIMEOUT:number = 4000;

export const TOAST_TYPES = {
  MESSAGE:'MESSAGE'
}

export const TOAST_THEMES = {
  DEFAULT: 'DEFAULT',
  DANGER:'DANGER',
  WARNING: 'WARNING',
  SUCCESS: 'SUCCESS',
  INFO: 'INFO'
}

export const TOAST_CONFIGURATIONS = {
  [TOAST_TYPES.MESSAGE]:{
    [TOAST_THEMES.DEFAULT]:<ToasterMessageTheme>{
      background:'',
      dismissButton:'is-outlined',
    },
    [TOAST_THEMES.DANGER]:<ToasterMessageTheme>{
      background:'is-danger',
      dismissButton:'is-danger is-inverted is-outlined',
    },
    [TOAST_THEMES.WARNING]:<ToasterMessageTheme>{
      background:'is-warning',
      dismissButton:'is-warning is-inverted is-outlined',
    },
    [TOAST_THEMES.SUCCESS]:<ToasterMessageTheme>{
      background:'is-success',
      dismissButton:'is-success is-inverted is-outlined'
    },
    [TOAST_THEMES.INFO]:<ToasterMessageTheme>{
      background:'is-info',
      dismissButton:'is-info is-inverted is-outlined',
    }
  }
}
