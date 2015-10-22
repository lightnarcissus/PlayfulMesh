#!/bin/sh
while (true);
do
	traceroute 10.1.1.50;
	traceroute 10.1.1.3;
	sleep 10;
done