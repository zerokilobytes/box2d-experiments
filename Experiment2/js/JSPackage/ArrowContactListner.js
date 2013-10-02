var ArrowContactListner = new b2ContactListener;

ArrowContactListner.BeginContact = function(contact) {

};

ArrowContactListner.EndContact = function(contact) {

};

ArrowContactListner.PostSolve = function(contact, oldManifold) {
    var contactPoint;
    var weldJointDef;

    if (contact.IsTouching()) {

        var bodyA = contact.GetFixtureA().GetBody();
        var bodyB = contact.GetFixtureB().GetBody();
        var objA = bodyA.GetUserData();
        var objB = bodyB.GetUserData();

        if (objA === undefined || objB === undefined)
            return;

        if (objA === null || objB === null)
            return;

        if (objA.name === "arrow" && objB.name === "arrow") {
            //console.log(contact);
            for (var j = bodyA.GetJointList(); j; j = j.next) {
                bodyA.GetWorld().DestroyJoint(j.joint);
            }
            for (j = bodyB.GetJointList(); j; j = j.next) {
                bodyB.GetWorld().DestroyJoint(j.joint);
            }
        }

        if (objB.name === "wall" && objA.name === "arrow") {
            if (!objA.freeFlight) {
                weldJointDef = new b2WeldJointDef();
                weldJointDef.Initialize(bodyA, bodyB, bodyB.GetWorldCenter());
                bodyA.GetWorld().CreateJoint(weldJointDef);

                if (objA.name === "arrow") {
                    objA.hasCollided = true;
                }
            }
            if (objA.freeFlight && objA.hasCollided && objA.name === "arrow") {
                //Undertaker.add(bodyA, bodyA.GetWorld());
            }
        }
        if (objA.name === "food" && objB.name === "arrow") {
            contactPoint = contact.GetManifold().m_points[0].m_localPoint;
            if (!objB.freeFlight && Math.round(contactPoint.x * 10) === 6) {
                //weldJointDef = new b2WeldJointDef();
                //weldJointDef.Initialize(bodyB, bodyA, bodyA.GetWorldCenter());
                //bodyB.GetWorld().CreateJoint(weldJointDef);
            }
        }
        if (objB.name === "food" && objA.name === "arrow") {

            contactPoint = contact.GetManifold().m_points[0].m_localPoint;
            if (!objA.freeFlight && Math.round(contactPoint.x * 10) === 6) {
                //weldJointDef = new b2WeldJointDef();
                //weldJointDef.Initialize(bodyA, bodyB, bodyB.GetWorldCenter());
                //bodyA.GetWorld().CreateJoint(weldJointDef);
            }
        }

        if ((objB.name === "arrow" && objA.name === "food") ||
                (objB.name === "food" && objA.name === "arrow")) {
            var objectToDestroy = null;
            var arrow = null;
            console.log(objB);
            if (objB.name === "arrow") {
                objectToDestroy = bodyA;
                arrow = bodyB;
            }
            else {
                objectToDestroy = bodyB;
                arrow = bodyA;
            }

            var guid = objectToDestroy.GetUserData().guid;
            if (!arrow.GetUserData().hasHit(guid) && !arrow.hasCollided) {
                arrow.GetUserData().addHit(guid);
                Undertaker.add(objectToDestroy.GetUserData());
            }
        }

        if (objA.name === "arrow" || objB.name === "arrow") {
            if (!objA.freeFlight) {
                objA.collisionTime = new Date();
            }
            objA.freeFlight = true;
        }
    }
};

ArrowContactListner.PreSolve = function(contact, oldManifold) {
    // PreSolve
};