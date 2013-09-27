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
        if (objA.name === "wall" && objB.name === "arrow") {
            if (!objB.freeFlight) {
                weldJointDef = new b2WeldJointDef();
                weldJointDef.Initialize(bodyB, bodyA, bodyA.GetWorldCenter());
                bodyB.GetWorld().CreateJoint(weldJointDef);
            }
        }
        if (objB.name === "wall" && objA.name === "arrow") {
            if (!objA.freeFlight) {
                weldJointDef = new b2WeldJointDef();
                weldJointDef.Initialize(bodyA, bodyB, bodyB.GetWorldCenter());
                bodyA.GetWorld().CreateJoint(weldJointDef);
            }
        }
        if (objA.name === "food" && objB.name === "arrow") {
            contactPoint = contact.GetManifold().m_points[0].m_localPoint;
            if (!objB.freeFlight && Math.round(contactPoint.x * 10) === 6) {
                weldJointDef = new b2WeldJointDef();
                weldJointDef.Initialize(bodyB, bodyA, bodyA.GetWorldCenter());
                bodyB.GetWorld().CreateJoint(weldJointDef);
            }
        }
        if (objB.name === "food" && objA.name === "arrow") {

            contactPoint = contact.GetManifold().m_points[0].m_localPoint;
            if (!objA.freeFlight && Math.round(contactPoint.x * 10) === 6) {
                weldJointDef = new b2WeldJointDef();
                weldJointDef.Initialize(bodyA, bodyB, bodyB.GetWorldCenter());
                bodyA.GetWorld().CreateJoint(weldJointDef);
            }
        }

        if ((objB.name === "arrow" && objA.name === "rope") ||
                (objB.name === "rope" && objA.name === "arrow")) {
            var objectToDestroy = null;
            if (objB.name === "arrow") {
                objectToDestroy = bodyA;
            }
            else {
                objectToDestroy = bodyB;
            }
            objectToDestroy.destroyed = true;
            //gameContext.push(objectToDestroy);
            //objectToDestroy.GetWorld().DestroyBody(objectToDestroy);
            //console.log(objectToDestroy);
        }


        if (objB.name === "arrow") {
            objB.freeFlight = true;
        }
        if (objA.name === "arrow") {
            objA.freeFlight = true;
        }
    }
};

ArrowContactListner.PreSolve = function(contact, oldManifold) {
    // PreSolve
};