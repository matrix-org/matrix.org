{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/b3a8f7ed267e0a7ed100eb7d716c9137ff120fe3.tar.gz") {}
}:

pkgs.mkShell {
  buildInputs = [
    pkgs.zola
  ];
}
