export class Link {
    constructor(
        {
            accesskey,
            coords,
            download,
            href,
            hreflang,
            name,
            rel,
            rev,
            shape,
            tabindex,
            target,
            title,
            type,
        } = {}) {
        this.objectType = 'link';
        this.accesskey = accesskey;
        this.coords = coords;
        this.download = download;
        this.href = href;
        this.hreflang = hreflang;
        this.name = name;
        this.rel = rel;
        this.rev = rev;
        this.shape = shape;
        this.tabindex = tabindex;
        this.target = target;
        this.title = title;
        this.type = type;
    }
}
