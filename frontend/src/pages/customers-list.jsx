import React from 'react'
import CustomersTable from '@/components/customers/CustomersTable'
import CustomersHeader from '@/components/customers/CustomersHeader'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import styles from "../../src/assets/scss/themes/pages/page-module.module.css"
import Footer from '@/components/shared/Footer'
const CustomersList = () => {
    return (
        <>
            <div className={styles.pageContainer}>
                <PageHeader>
                    <CustomersHeader />
                </PageHeader>
                <div className={`${styles.contentArea} main-content`}>
                    <div className='row'>
                        <CustomersTable />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CustomersList