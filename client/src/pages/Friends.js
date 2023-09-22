import React, {useState, useEffect} from "react";
import FriendCard from "../components/FriendCard";
import FriendsSearchBar from "../components/FriendsSearchBar";

function Friends() {

    const [allUsers, setAllUsers] = useState([])
    const [allFriends, setAllFriends] = useState([])
    const [search, setSearch] = useState("")
    const [searchFriends, setSearchFriends] = useState("")

    useEffect(() => {
        fetch('/users').then((r) => {
            if (r.ok) {
            r.json().then((user) => setAllUsers(user));
            }
        });
        }, []);

    useEffect(() => {
        fetch('/followers_list').then((r) => {
            if (r.ok) {
            r.json().then((user) => setAllFriends(user));
            }
        });
        }, []);

    function handleSearchChange(e){
        setSearch(e.target.value)
    }

    function handleSearchFriendsChange(e){
        setSearchFriends(e.target.value)
        console.log(e.target.value)
    }

    function handleAddFriend(){
        console.log('Friend Added')
    }

    let filteredUsers = allUsers
    if (search !== ''){filteredUsers =
    allUsers.filter((user) => 
    user.username.toLowerCase().includes(search.toLowerCase()))}

    let filteredFriends = allFriends
    if (searchFriends !== ''){filteredFriends =
    allFriends.filter((friend) => 
    friend.username.toLowerCase().includes(searchFriends.toLowerCase()))}


    /*below function is bc friends and users are stored in different 
    places in memory and cannot be compared directly to one another*/
    let usersWithoutFriends = filteredUsers.filter(user => {
        let returnValue = true
        //loops through all friends
        allFriends.forEach(friend => {
            //checks if friend.id === user.id
            if (friend.id === user.id)
            //if equal, return value is false
                returnValue = false
        })
        return returnValue
    })

    return(
        <div>
            <div>
                <h1 class="ui center aligned icon header">Friends</h1>
                <FriendsSearchBar
                handleSearchChange={handleSearchFriendsChange}
                />
                <div class="ui grid">
                    {filteredFriends.map((friend) =>
                    <FriendCard
                    {...friend}
                    key={friend.id}
                    />)}
                </div>
            </div>
            <div>
                <h1 class="ui center aligned icon header">Find</h1>
                <FriendsSearchBar
                handleSearchChange={handleSearchChange}
                />
                <div class="ui grid">
                    {usersWithoutFriends.map((user) =>
                    <FriendCard
                    handleAddFriend={handleAddFriend}
                    {...user}
                    key={user.id}
                    />)}
                </div>
            </div>
        </div>
    )
}

export default Friends