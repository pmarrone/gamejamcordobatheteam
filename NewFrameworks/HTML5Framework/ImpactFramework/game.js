ig.baked = true;
ig.module('impact.game').requires('impact.impact', 'impact.entity', 'impact.collision-map', 'impact.background-map').defines(function () {
    ig.Game = ig.Class.extend({ clearColor: '#000000', gravity: 0, screen: { x: 0, y: 0 }, entities: [], namedEntities: {}, collisionMap: ig.CollisionMap.staticNoCollision, backgroundMaps: [], backgroundAnims: {}, cellSize: 64, loadLevel: function (data) {
        this.screen = { x: 0, y: 0 };
        this.entities = [];
        this.namedEntities = {};
        for (var i = 0;
			i < data.entities.length;
			i++) {
            var ent = data.entities[i];
            this.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
        }
        this.sortEntities();
        this.collisionMap = null;
        this.backgroundMaps = [];
        for (var i = 0;
			i < data.layer.length;
			i++) {
            var ld = data.layer[i];
            if (ld.name == 'collision') {
                this.collisionMap = new ig.CollisionMap(ld.tilesize, ld.data);
            }
            else {
                var newMap = new ig.BackgroundMap(ld.tilesize, ld.data, ld.tilesetName);
                newMap.anims = this.backgroundAnims[ld.tilesetName] || {};
                newMap.repeat = ld.repeat;
                newMap.distance = ld.distance;
                this.backgroundMaps.push(newMap);
            } 
        } 
    }, getEntityByName: function (name) {
        return this.namedEntities[name];
    }, getEntitiesByType: function (type) {
        var entityClass = typeof (type) === 'string' ? ig.global[type] : type;
        var a = [];
        for (var i = 0;
			i < this.entities.length;
			i++) {
            if (this.entities[i] instanceof entityClass) {
                a.push(this.entities[i]);
            } 
        }
        return a;
    }, spawnEntity: function (type, x, y, settings) {
        var entityClass = typeof (type) === 'string' ? ig.global[type] : type;
        if (!entityClass) {
            throw ("Can't spawn entity of type " + type);
        }
        var ent = new (entityClass)(x, y, settings || {});
        this.entities.push(ent);
        if (ent.name) {
            this.namedEntities[ent.name] = ent;
        }
        return ent;
    }, sortEntities: function () {
        this.entities.sort(function (a, b) {
            return a.zIndex - b.zIndex;
        });
    }, removeEntity: function (ent) {
        if (ent.name) {
            delete this.namedEntities[ent.name];
        }
        this.entities.erase(ent);
    }, run: function () {
        this.update();
        this.draw();
    }, update: function () {
        for (var i = 0;
			i < this.entities.length;
			i++) {
            this.entities[i].update();
        }
        this.checkEntities();
        for (var tileset in this.backgroundAnims) {
            var anims = this.backgroundAnims[tileset];
            for (var a in anims) {
                anims[a].update();
            } 
        }
        for (var i = 0;
			i < this.backgroundMaps.length;
			i++) {
            this.backgroundMaps[i].setScreenPos(this.screen.x, this.screen.y);
        } 
    }, draw: function () {
        ig.system.clear(this.clearColor);
        for (var i = 0;
			i < this.backgroundMaps.length;
			i++) {
            this.backgroundMaps[i].draw();
        }
        for (var i = 0;
			i < this.entities.length;
			i++) {
            this.entities[i].draw();
        } 
    }, checkEntities: function () {
        var hash = {};
        for (var e = 0;
			e < this.entities.length;
			e++) {
            var entity = this.entities[e];
            if (e.type == ig.Entity.TYPE.NONE && e.checkAgainst == ig.Entity.TYPE.NONE && e.collides == ig.Entity.COLLIDES.NEVER) {
                continue;
            }
            var checked = {}, xmin = (entity.pos.x / this.cellSize).floor(), ymin = (entity.pos.y / this.cellSize).floor(), xmax = ((entity.pos.x + entity.size.x) / this.cellSize).floor() + 1, ymax = ((entity.pos.y + entity.size.y) / this.cellSize).floor() + 1;
            for (var x = xmin;
				x < xmax;
				x++) {
                for (var y = ymin;
					y < ymax;
					y++) {
                    if (!hash[x]) {
                        hash[x] = {};
                        hash[x][y] = [entity];
                    }
                    else if (!hash[x][y]) {
                        hash[x][y] = [entity];
                    }
                    else {
                        var cell = hash[x][y];
                        for (var c = 0;
							c < cell.length;
							c++) {
                            if (entity.touches(cell[c]) && !checked[cell[c].id]) {
                                checked[cell[c].id] = true;
                                ig.Entity.checkPair(entity, cell[c]);
                            } 
                        }
                        cell.push(entity);
                    } 
                } 
            } 
        } 
    } 
    });
});