# node-bash-pipe
Parse bash commands with n pipes in nodeJS. Just for fun. [shellJS](https://github.com/shelljs/shelljs) is the real deal. Inspired by [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options). Kinda cool how you can write data to a stream that has no handler for data yet. Note: Left out error handlers for brevity.

# usage
```bash
$ node parser.js "cat LICENSE | grep -iw is | head -n1"
```

# licence
MIT
