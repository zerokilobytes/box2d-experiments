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
               // this.modelManager.spawnRate = 30;
                //this.world.SetGravity(new b2Vec2(0.0, 0.0));
            }
        }
    ]
};