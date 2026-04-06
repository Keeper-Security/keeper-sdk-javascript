import { login, cleanup, logger, extractErrorMessage } from 'keeper-sdk'

function padRight(str: string, len: number): string {
    if (str.length >= len) return str.substring(0, len)
    return str + ' '.repeat(len - str.length)
}

async function shareReport() {
    const vault = await login()

    try {
        logger.info('=== Shared Records Report ===\n')

        const recordsReport = vault.getSharedRecordsReport()
        if (recordsReport.length === 0) {
            logger.info('No shared records found.\n')
        } else {
            logger.info(
                padRight('Record UID', 24) +
                padRight('Title', 30) +
                padRight('Owner', 30) +
                'Shared With'
            )
            logger.info('-'.repeat(100))

            for (const entry of recordsReport) {
                logger.info(
                    padRight(entry.recordUid, 24) +
                    padRight(entry.recordTitle, 30) +
                    padRight(entry.recordOwner, 30) +
                    String(entry.sharedWithCount)
                )
            }
            logger.info('')
        }

        logger.info('=== Shared Folders Report ===\n')

        const foldersReport = vault.getSharedFoldersReport()
        if (foldersReport.length === 0) {
            logger.info('No shared folders found.\n')
        } else {
            logger.info(
                padRight('Folder UID', 24) +
                padRight('Folder Name', 25) +
                padRight('Shared To', 30) +
                'Permissions'
            )
            logger.info('-'.repeat(100))

            for (const entry of foldersReport) {
                logger.info(
                    padRight(entry.folderUid, 24) +
                    padRight(entry.folderName, 25) +
                    padRight(entry.sharedTo, 30) +
                    entry.permissions
                )
            }
            logger.info('')
        }

        logger.info('=== Share Summary Report ===\n')

        const summaryReport = vault.getShareSummaryReport()
        if (summaryReport.length === 0) {
            logger.info('No shares found.\n')
        } else {
            logger.info(
                padRight('Shared To', 40) +
                padRight('Records', 12) +
                'Shared Folders'
            )
            logger.info('-'.repeat(66))

            for (const entry of summaryReport) {
                logger.info(
                    padRight(entry.sharedTo, 40) +
                    padRight(String(entry.recordCount), 12) +
                    String(entry.sharedFolderCount)
                )
            }
            logger.info('')
        }
    } finally {
        await cleanup(vault)
    }
}

shareReport()
    .then(() => process.exit(0))
    .catch((err) => {
        logger.error('Error:', extractErrorMessage(err))
        process.exit(1)
    })
