#!/bin/bash

npm run build &
wait &
npm run serverStart &
wait