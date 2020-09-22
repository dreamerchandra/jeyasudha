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
      {data && <Table accountData={data} />}
    </>
  )
}

const areEqual = (preProps, nextProps) => {
  return preProps.docRef.isEqual(nextProps.docRef)
}

const MemoizedTablePopulator = memo(TablePopulator, areEqual)
export default MemoizedTablePopulator
