#!/usr/bin/perl

use strict;
use warnings;

if (scalar(@ARGV) < 1) {
    die "Usage: $0 include_dir file_to_replace...";
}

my $include_dir = $ARGV[0];
if (! -d $include_dir) {
    die "'$include_dir' is not a directory";
}

my $header = read_file("${include_dir}/head.html");
my $nav = read_file("${include_dir}/nav.html");
my $footer = read_file("${include_dir}/footer.html");

$header .= "<link rel=\"stylesheet\" href=\"/docs/guides/css/docs_overrides.css\">\n";

$nav = <<EOT;
  <div id="page-wrapper">
    <div class="page-content" id="page-container">
      $nav
       <div id="main-content">
         <div class="wrapper" id="wrapper">
           <div class="document_foo" id="document">
EOT

my $outdatedspecwarning = <<EOT;
    <div class="admonition warning" style="font-size: x-large;">
        <p class="first admonition-title">Warning</p>
        <p class="last">You are viewing an outdated version of this
        specification. To view the current specification, please 
        <a class="reference external" href="latest.html">click here</a>.</p>
    </div>
EOT

$footer = <<EOT;
            </div>
          </div>
          <div class="push">
          </div>
        </div>
      </div>
        $footer
      </div>
    </div>
EOT

my $proposalscssinjection = <<EOT;
<style>
    table.colwidths-auto tr td:nth-child(3), 
    table.colwidths-auto tr td:nth-child(2) {
        width: initial;
    }
    table.colwidths-auto tr td:nth-child(3), 
    table.colwidths-auto tr td:nth-child(4) {
        white-space: nowrap;
    }
</style>
EOT

my $oldargv;
while(<>) {
    if (!$oldargv || $ARGV ne $oldargv) {
        # new file: open output file
        unlink($ARGV);
        open(ARGVOUT, ">", $ARGV);
        select(ARGVOUT);
        $oldargv = $ARGV;
    }

    s/<head>/$&$header/;

    s/\%outdatedspecwarning\%/$outdatedspecwarning/;
    s/\%proposalscssinjection\%/$proposalscssinjection/;

    if (/<body.*?>/) {
        my $match = $&;
        my $classes = "blog et_fixed_nav et_cover_background et_right_sidebar";
        if ($match =~ / class=/) {
            $match =~ s/ class="([^"]*)"/ class="$1 $classes"/;
        } else {
            $match =~ s/>/ class=\"$classes\">/;
        }

        s/<body.*?>/$match$nav/;
    }

    s#</body>#$footer$&#;

    print;
}

sub read_file {
    # http://perl-begin.org/tutorials/bad-elements/#slurp
    my $filename = shift;
    open my $in, '<', $filename
        or die "Cannot open '$filename' for slurping - $!";
    local $/;
    my $contents = <$in>;
    close($in);
    return $contents;
}
