import classNames from 'classnames/bind';
import PostItem from '../PostItem';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

function Posts() {
    const posts = [
        {
            author: {
                name: 'TienZona',
                image: '',
            },
            created_at: '11:44 2/28/2023',
            updated_at: null,
            title: 'Thông báo họp cố vấn',
            content: 'Helo xin chào các bạn tôi sẽ thông báo hôm nay',
            comments: [
                {
                    author: {
                        name: 'TienZona',
                        image: '',
                    },
                    created_at: '11:46',
                    updated_at: null,
                },
            ],
        },
    ];

    return (
        <div className={cx('wrap')}>
            {posts.map((post, index) => (
                <PostItem post={post} key={index} />
            ))}
        </div>
    );
}

export default Posts;
