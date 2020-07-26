class FastNode {
    private nodes: HTMLElement[];

    constructor(elements: HTMLElement[] | NodeList) {
        this.nodes = [];
        elements.forEach(element => {
            this.nodes.push(element);
        });
        
    }

    map(func: Function) {
        this.nodes.map((element: HTMLElement, key: number) => {
            func(new FastNode([element]), key);
        });
        return this;
    }

    each(func: Function) {
        this.nodes.map((element: HTMLElement, key: number) => {
            func(element, key);
        });
        return this;
    }

    on(event: string, callback: EventListenerOrEventListenerObject) {
        this.each((element: HTMLElement) => {
            element.addEventListener(event, callback);
        })
        return this;
    }

    text(inner: string | null | undefined) {
        if(inner) {
            this.each((element: HTMLElement) => element.innerHTML = inner)
            return this;
        } else {
            if(this.nodes.length === 1) return this.nodes[0].innerHTML;
            else {
                const text_list = [];
                this.each((element: HTMLElement) => text_list.push(element.innerHTML))
                return text_list;
            }
        }
    }

    hide() {
        this.each((element: any) => {
            element.prev_display = element.style.display;
            element.style.display = "none";
        })
        return this;
    }

    toggleHide() {
        this.each((element: any) => {
            if(element.style.display === "none") {
                element.style.display = element.prev_display || "";
            } else {
                element.prev_display = element.style.display;
                element.style.display = "none";
            }
        })
    }

    show() {
        this.each((element: any) => {
            element.style.display = element.prev_display || "";
        })
        return this;
    }

    css(...args: any) {
        if(!args[0]) {
            if(this.nodes.length === 1) {
                return {...this.nodes[0].style};
            } else {
                const style_list = [];
                this.each((element: HTMLElement) => style_list.push({...element.style}));
                return style_list;
            }
        }

        switch(typeof(args[0])) {
            case "string":
                this.nodes.forEach(element => {
                    element.style[args[0]] = args[1];
                })
                break;
            case "object":
                this.nodes.forEach((element) => {
                    Object.keys(args[0]).map(key => {
                        element.style[key] = args[0][key];
                    })
                })
                break;
        }
        return this;
    }
}

const $ = (args: any) => {
    switch(typeof(args)) {
        case "function":
            document.addEventListener("DOMContentLoaded", args);
            break;
        
        case "object":
            if (args instanceof HTMLElement) {
                return new FastNode([args])
            }
            if(args instanceof Array) {
                return new FastNode(args)
            }
            if(args instanceof NodeList) {
                const elements = [];
                args.forEach(element => elements.push(element));
                return new FastNode(elements);
            }
            break;

        case "string":
            return new FastNode(document.querySelectorAll(args));
    }
}