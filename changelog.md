## ChangeLog
    0.3.9 -> 0.3.10
        Switched once again promise library, now to bluebird for even better performance, I doubt that any faster promise implementation will replace it any time in next year, so bluebird will last longer than the last two
    0.2.5 -> 0.3.0
        Synchronous resolution of a call can be now also rejected without need to create and reject a promise by simply returning an instance of Error
    0.1.3 -> 0.1.4
        Added a directive to angularJS client to make instantiating a controller with rpc channel less of a chore
    0.0.8 -> 0.0.9
          Switched from Q to when.js for better performance