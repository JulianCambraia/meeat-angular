class Order {
    constructor(public endereco: string,
        public numero: string,
        public complemento: string,
        public opcaoDePagameno: string,
        public orderItems: OrderItem[] = []
    ) { }
}

class OrderItem {
    constructor(public quantidade: number, public menuId: string) { }
};

export { Order, OrderItem };
