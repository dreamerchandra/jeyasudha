import React, { memo } from 'react'
import useCollectionDataOnce from '../../common-hoooks/use-firestore-wrapper'
import LoaderHoc from '../loading'

function TablePopulator({ Table, docRef }) {
  const { data, loading } = useCollectionDataOnce({
    ref: docRef,
    idField: 'id',
  })
  return (
    <>
      {loading && (
        <LoaderHoc>
          <h1>Downloading accounts data</h1>
        </LoaderHoc>
      )}
      {data?.length ? (
        <Table data={data} />
      ) : (
        <p style={{ fontSize: '3rem', textAlign: 'center', color: 'var(--blue5)' }}>
          No data to show
        </p>
      )}
    </>
  )
}

const areEqual = (preProps, nextProps) => {
  return preProps?.docRef?.isEqual(nextProps?.docRef)
}

const MemoizedTablePopulator = memo(TablePopulator, areEqual)
export default MemoizedTablePopulator
