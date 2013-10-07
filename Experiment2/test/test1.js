test1 = {
    name: "Test 1",
    fixtures: [
        {
            type: Bow,
            data: {x: 240, y: 800, rotation: 0}
        }
    ],
    actors: [],
    actions: [
        {
            intervals: 8000,
            event: function() {
                Temp.set('spawnRate', this.modelManager.spawnRate);
                Temp.set('toad.gravity', Global.toad.gravity.y);

                this.modelManager.spawnRate = 30;
                Global.toad.gravity.y = -9.82;
                //this.world.SetGravity(new b2Vec2(0.0, 0.0));
            }

        },
        {
            intervals: 12000,
            event: function() {
                this.modelManager.spawnRate = Temp.get('spawnRate');
                Global.toad.gravity.y = Temp.get('toad.gravity');
                //this.world.SetGravity(new b2Vec2(0.0, 0.0));
            }

        }
    ]
};