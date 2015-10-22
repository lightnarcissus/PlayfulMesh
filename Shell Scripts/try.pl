#!/usr/bin/perl
# Kurt Schwind: A little of KC's Sunshine

use strict;
use warnings;

my @l = qw(
a
aah
best
booty
can
chance
come
dance
do
don't
down
duty
everybody
feeling
feelings
fight
floor
get
give
home
I
in
it
let's
momma
now
Oh
on
run
shake
sister
tell
the
to
very
well
with
world
yeah
you
You
your
You're
yourself);

sub line {
    my $j = shift;
    while(defined $j ) {
        print $l[$j]." ";
        $j = shift;
    }
    print "\n";
}

sub refrain {
    for(1..6) {
        print $l[29]." ";
    }
    print "\n";
    line (29,41,3);
    line (29,41,3);
    for(1..6) {
        print $l[29]." ";
    }
    print "\n";
    line (29,41,3);
    line (29,41,3);
    print "\n";
};

sub groove {
    for(1..5) {
        print $l[29]." ";
    }
    line (41,3);
};

line (1,12,17,27,32,16,23,7);
line (9,15,41,14,18,43,0,5);
print "\n";
refrain();

line (1,39,4,39,4,8,22,34,35);
line (42,32,2,21,32,37,20,4,31);
print "\n";
line(26);
refrain();

line (26,38);
line (29,29,29,29);
line (1,29,29,29,29);
print "\n";

line(1);
refrain();

line(1);
groove();
line(1,9,15,32,13);
groove();
line(1,18,43,0,5);

print "\n";
groove();
line(42,4,8,22,8,22);
groove();
line(6,19,36,24,25);
groove();

print "\n";
groove();
line(1,28,10,33,30);
line(29,29,29,29,27,41,3);
line(1,8,41,11);
line(29,29,29,29);