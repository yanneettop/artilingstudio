$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$magick = Get-Command magick -ErrorAction Stop

function Convert-ToWebp {
  param(
    [Parameter(Mandatory = $true)]
    [string] $Source,
    [Parameter(Mandatory = $true)]
    [string] $Destination,
    [int] $Quality = 84,
    [string] $Resize = $null
  )

  $sourcePath = Join-Path $root $Source
  $destinationPath = Join-Path $root $Destination
  $args = @($sourcePath)

  if ($Resize) {
    $args += @("-resize", $Resize)
  }

  $args += @("-strip", "-quality", $Quality, $destinationPath)
  & $magick.Source @args
}

Convert-ToWebp "assets/images/studio.png" "assets/images/studio.webp"
Convert-ToWebp "assets/images/hero3.png" "assets/images/hero3.webp"
Convert-ToWebp "assets/images/Signature/main.png" "assets/images/Signature/main.webp"
Convert-ToWebp "assets/images/Signature/material_finish.png" "assets/images/Signature/material_finish.webp"
Convert-ToWebp "assets/images/Signature/detail.png" "assets/images/Signature/detail.webp"
Convert-ToWebp "assets/images/precision-edge.png" "assets/images/precision-edge.webp"
Convert-ToWebp "assets/images/Signature/precision_edge.png" "assets/images/Signature/precision_edge.webp"
Convert-ToWebp "assets/images/artiling_logo.png" "assets/images/artiling_logo.webp" -Quality 90 -Resize "256x256"

Get-ChildItem -Path (Join-Path $root "assets/images") -Recurse -Filter *.webp |
  Select-Object FullName, Length |
  Format-Table -AutoSize
