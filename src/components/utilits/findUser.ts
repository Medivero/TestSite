interface User {
    address: {
      city: string;
    };
    email: string;
    name: string;
    phone: string;
    website: string;
    username: string;
  }
function FindUser(data:User[],readName:string){
    let ProtoData = [...data];
    let TrueIndex:Number[] = [];
    ProtoData.forEach((User, index) => {
        const name = User.name.toLowerCase();
        const city = User.address.city.toLowerCase();
        const email = User.email.toLowerCase();

        if (
            name.includes(readName.toLowerCase()) ||
            city.includes(readName.toLowerCase()) ||
            email.includes(readName.toLowerCase())
        ) {
            TrueIndex.push(index);
        }
    });
    return TrueIndex;
}

export default FindUser;