#check to see if test file name was not passed as argument
param(
    [string]$FileName
)
$ValidData = $true
$FQPath = ".\dist\__tests__\" + $FileName.toString()
$FQPathExt = $FQPath + ".js"
$JestPath = ".\node_modules\.bin\jest"


# Write-Host $FQPath
# Write-Host $FQPathExt
# Write-Host $JestPath


if(($FileName -eq $null) -or ($FileName -eq ''))
{
    Write-Error "No file name was provided"
    $ValidData = $false
}
# check to ensure that the test file exists
elseif(!(Test-Path -Path ($FQPath + ".js") -PathType Leaf) -and !(Test-Path -Path $FQPath -PathType Leaf)) {
    Write-Error ("The file path: " + $FQPath + " you provided does not exist")
    $ValidData = $false
}
# run the test file
else {
    Write-Host "Running tests for" $FileName
    if ($FileName -match '.*\.js') {
       Invoke-Expression ($JestPath + " " + $FileName)
    } else {
        Invoke-Expression ($JestPath + " " + $FileName + ".js")
    }
}