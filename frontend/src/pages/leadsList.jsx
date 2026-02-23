import React from 'react'
import PageHeader from '@/components/shared/pageHeader/PageHeader'
import LeadsHeader from '@/components/leads/LeadsHeader'
import LeadssTable from '@/components/leads/LeadsTable'
import Footer from '@/components/shared/Footer'
import styles from "../../src/assets/scss/themes/pages/page-module.module.css" // aa css file thi footer end ma set thase
const LeadsList = () => {
    return (
        <>
            <div className={styles.pageContainer}>
                <PageHeader>
                    <LeadsHeader />
                </PageHeader>
                <div className={`${styles.contentArea}main-content`}>
                    <div className='row'>
                        <LeadssTable />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default LeadsList