// objeto de configuração para dizer em qual ambiente vai rodar
interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',

    defaults: {
        from: {
            email: 'marcelo.franchini@marcelofranchini.tech',
            name: 'Marcelo Franchini',
        },
    },
} as IMailConfig;
