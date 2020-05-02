#!/bin/bash
docker run --name "comp" -it -d -v$(pwd)/code:/code --rm compilerenv:1.0  /bin/bash