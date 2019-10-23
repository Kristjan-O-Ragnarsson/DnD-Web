#!/bin/bash

tag=dev-0.1
buildpath=.

echo "building" $tag

docker build -t registry-intl-vpc.cn-hangzhou.aliyuncs.com/dnd_web/dnd_web:$tag $buildpath

echo "Pushing" $tag "to china"
