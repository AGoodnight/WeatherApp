interface ToastConfiguration{
  title?:string,
  message?:string,
  author?:string,
  ttl?:number,
  delay?:number,
  style?:'info' | 'warning' | 'success' | 'danger'
}

interface ToasterMessageTheme{
  background:string,
  dismissButton:string
}