import { getArticles } from '@src/functions/api';
import { Pagination } from '@src/components/Pagination'
import { ArticleType } from '@src/constants/types';
import { useState } from 'react'
import { useQuery } from 'react-query';
import PageHeader from '@src/components/PageHeader';
import { Link } from 'react-router-dom';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ArticleCard from '@src/components/ArticleCard';

interface ArticleData {
  data: {
    data: ArticleType[]
    page_no: number
    page_size: number
    has_prev: boolean
    has_next: boolean
    total_result: number
    total_pages: number
  }
}

function Articles() {
  const [pageSize, setPageSize] = useState(20)
  const [pageNo, setPageNo] = useState(1)

  const { isLoading, error, data } = useQuery<ArticleData, Error>({
    queryKey: ['articles', pageNo, pageSize],
    queryFn: () => getArticles({ pageNo, pageSize })
  })

  if (isLoading || error || !data) return;

  return (
    <div>
      <PageHeader
        title="Articles Collection"
        subtitle="Let's upload some images and store them for later! 🎉"
        right={
          <Link className="btn btn-primary" to="/articles/create">
            <PaperAirplaneIcon className="h-5 w-5" />
            Submit New Article
          </Link>}
      />

      <div className='grid grid-cols-3 gap-5 my-5'>
        {data.data.data.map((e, i) => (
          <ArticleCard article={e} key={i} />
        ))}
      </div>

      <div>
        <Pagination
          page_no={data.data.page_no}
          page_size={data.data.page_size}
          has_prev={data.data.has_prev}
          has_next={data.data.has_next}
          total_result={data.data.total_result}
          total_pages={data.data.total_pages}
          setPageSize={setPageSize}
          setPageNo={setPageNo}
        />
      </div>
    </div>
  )
}

export default Articles