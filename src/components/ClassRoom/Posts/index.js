import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import PostItem from '../PostItem';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

function Posts({ classID, reset }) {
    const [refresh, setRefresh] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/classroom/post/${classID}`)
            .then((respone) => {
                setPosts((prev) => [...respone.data]);
            })
            .catch((err) => console.log(err));
    }, [classID, reset, refresh]);

    return (
        <div className={cx('wrap')}>
            {posts.map((post, index) => (
                <PostItem post={post} key={index} refresh={refresh} reset={setRefresh} />
            ))}
        </div>
    );
}

export default Posts;
