import {readFileSync} from 'fs';
const input = readFileSync('input.txt', 'utf-8').trim().split(/\r?\n/);

type Point = [number, number, number, number];

class PocketDimension {
    private map: Map<number, Map<number, Map<number, Map<number, boolean>>>>;

    public constructor() {
        this.map = new Map<number, Map<number, Map<number, Map<number, boolean>>>>();
    }

    public setStatus(point: Point, status: boolean)  {
        const [x, y, z, w] = point;

        let mapY = this.map.get(x);
        if (!mapY) mapY = new Map<number, Map<number, Map<number, boolean>>>();

        this.map.set(x, mapY);

        let mapZ = mapY.get(y);
        if (!mapZ) mapZ = new Map<number, Map<number, boolean>>();

        mapY.set(y, mapZ);

        let mapW = mapZ.get(z);
        if (!mapW) mapW = new Map<number, boolean>();

        mapZ.set(z, mapW);
        mapW.set(w, status);
    }

    public isActive(point: Point) {
        const [x, y, z, w] = point;
        return !!this.map.get(x)?.get(y)?.get(z)?.get(w);
    }

    public countActiveNeighbors (point: Point) {
        const [x, y, z, w] = point;
        let activeCount = 0;

        for (let searchX = -1; searchX <= 1; searchX++) {
            for (let searchY = -1; searchY <= 1; searchY++) {
                for (let searchZ = -1; searchZ <= 1; searchZ++) {
                    for (let searchW = -1; searchW <= 1; searchW++) {
                        if (searchX === 0 && searchY === 0 && searchZ === 0 && searchW === 0) continue;

                        const searchPoint = [x + searchX, y + searchY, z + searchZ, w + searchW];

                        if (this.isActive(searchPoint as Point)) {
                            activeCount++;
                            if (activeCount >= 4) return activeCount;
                        }
                    }
                }
            }
        }

        return activeCount;
    }

    public countAllActive() {
        let active = 0;
        this.map.forEach((mapY) => {
            mapY.forEach((mapZ) => {
                mapZ.forEach((mapW) => {
                    mapW.forEach((status) => {
                        if (status) active++;
                    });
                });
            });
        });
        return active;
    }
}

let pocketDimension = new PocketDimension();
const cycles = 6;
const initialSize = input.length;

input.forEach((line, y) => {
    line.split('').forEach((cube, x) => {
        pocketDimension.setStatus([x, y, 0, 0], cube === '#');
    });
});

for (let i = 1; i <= cycles; i++) {
    const nextDimension = new PocketDimension();

    for (let x = -i; x < initialSize + i; x++) {
        for (let y = -i; y < initialSize + i; y++) {
            for (let z = -i; z <= i; z++) {
                for (let w = -i; w <= i; w++) {
                    const point = [x, y, z, w];
                    const active = pocketDimension.isActive(point as Point);
                    const activeNeighbors = pocketDimension.countActiveNeighbors(point as Point);
                    const nextStatus = (active && activeNeighbors === 2) || activeNeighbors === 3;

                    nextDimension.setStatus(point as Point, nextStatus);
                }
            }
        }
    }

    pocketDimension = nextDimension;
}

console.log('Result: ' + pocketDimension.countAllActive());
