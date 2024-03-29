import nodemailer from 'nodemailer';
import { resolve } from 'path';
import exphbs from 'express-handlebars';
import nodeimailerhbs from 'nodemailer-express-handlebars';
import mailConfig from '../config/mail';

// Configurações de email
class Mail{
  constructor(){

    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host, 
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates(){
    const viewPath = resolve(__dirname, '..','app', 'views', 'emails' );
    this.transporter.use('compile', nodeimailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName:'.hbs',

    }))
  }
  sendMail(message){
    return this.transporter.sendMail({
      ...mailConfig,
      ...message,
    });
  }
}

export default new Mail();