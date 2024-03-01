reset
set datafile separator ","
set xdata time
set timefmt "%Y-%m-%d"
set format x "%Y-%m-%d"
set yrange [] reverse
set dgrid3d 60,494 gauss 2*86400,60
set hidden3d
set pm3d
set view 50,40,1
set contour
# set style fill transparent solid 0.4 border
splot "cohort-3d.csv" u 1:2:3 with pm3d
