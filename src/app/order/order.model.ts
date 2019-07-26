class Order {
    constructor(public nome: string,
        public email: string,
        public emailConfirmacao: string,
        public endereco: string,
        public numero: string,
        public complemento: string,
        public opcaoDePagameno: string,
        public orderItems: OrderItem[] = [],
        public id?: string,
    ) { }
}

class OrderItem {
    constructor(public quantidade: number, public menuId: string) { }
};

export { Order, OrderItem };
