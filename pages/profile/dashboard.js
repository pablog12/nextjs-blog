import useSWR from 'swr';

function Profile() {
    const { data, error } = useSWR('/api/user', fetch);

    if (error) return <div>failed to load</div>;
    if (!data) return <div>loading...</div>;
    var i = ['1', '2'];
    return <div>hello {data.name}!</div>;
}

export default Profile;
