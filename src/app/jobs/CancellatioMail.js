import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';
import pt from 'date-fns/locale/pt';

class CancellationMail {
  get key(){
    return 'CacellationMail';
  }

  async handle({ data }){
  const { appointment } = data;

    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.provider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'partials/cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format( parseISO(appointment.date), "'dia' dd 'de' MMMM', às' H:mm'h'",{
           locale: pt 
          }
        ),
      }
    });
  }
}

export default new CancellationMail();