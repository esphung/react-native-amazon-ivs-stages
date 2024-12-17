#Get value for version in parameters
NEW_VERSION=$1
OLD_VERSION=$2

echo $OLD_VERSION
echo $NEW_VERSION

echo "Incrementing version from $OLD_VERSION to $NEW_VERSION"

# Find and replace version for NEW_VERSION in package.json
sed -i '' "s/$OLD_VERSION/$NEW_VERSION/g" package.json

# Find and replace README.md version badge
sed -i '' "s/$OLD_VERSION/$NEW_VERSION/g" README.md

