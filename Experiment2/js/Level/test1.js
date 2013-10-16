test1 = {
    name: "Test 1",
    lives: 5,
    durtations: 30000,
    fixtures: [
        {
            type: Bow,
            data: {x: 300, y: 600, rotation: 0}
        }
    ],
    actors: [],
    actions: [
        {
            intervals: 0,
            event: function() {
                Temp.set('spawnRate', this.modelManager.spawnRate);
                Temp.set('fireRate', this.modelManager.fireRate);

                Temp.set('toad.gravity', Global.toad.gravity.y);
                Temp.set('arrow.velocity', Global.arrow.velocity);
                Temp.set('arrow.count', Global.arrow.count);
            }
        },
        {
            //Increase fire rate and speed
            intervals: 8000,
            event: function() {


                var bonus = new Bonus(this);
                this.modelManager.add(bonus);
                bonus.spawn({position: {x: 300, y: 0}});

                var _this = this;

                bonus.onAcquire = function(event) {
                    _this.modelManager.fireRate = 80;
                    Global.arrow.count = 4;
                };
            }
        },
        {
            //Begin change
            intervals: 8000,
            event: function() {
                this.modelManager.spawnRate = 30;
                Global.toad.gravity.y = -8.82;
            }
        },
        {
            //Increase fire rate and speed
            intervals: 10000,
            event: function() {
                // this.modelManager.fireRate = 80;
                //Global.arrow.count = 4;
            }
        },
        {
            //Reset spawnRate
            intervals: 16000,
            event: function() {
                this.modelManager.spawnRate = Temp.get('spawnRate');
                Global.toad.gravity.y = Temp.get('toad.gravity');
            }
        },
        {
            //Reset all
            intervals: 18000,
            event: function() {
                this.modelManager.fireRate = Temp.get('fireRate');
                Global.arrow.velocity = Temp.get('arrow.velocity');
                Global.arrow.count = Temp.get('arrow.count');
            }
        }
    ]
};
////this.world.SetGravity(new b2Vec2(0.0, 0.0));