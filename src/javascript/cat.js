export class Cat {
    constructor(src) {
        this._src = src;
    }

    render(container) {
        if (!container) {
            throw new Error('No container specified');
        }

        const imageElement = document.createElement('img');
        imageElement.src = this._src;
        container.appendChild(imageElement);
    }
}
