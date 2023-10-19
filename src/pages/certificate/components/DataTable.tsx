import { Certs } from "@/entity/types"
import { formatDateTime } from "@/utils/time"
import Paper from "@mui/material/Paper/Paper"
import Table from "@mui/material/Table/Table"
import TableBody from "@mui/material/TableBody/TableBody"
import TableContainer from "@mui/material/TableContainer/TableContainer"
import TableHead from "@mui/material/TableHead/TableHead"
import TableRow from "@mui/material/TableRow/TableRow"
import Tooltip from "@mui/material/Tooltip/Tooltip"
import { FC } from "react"
import { DOMAIN_ROW_MAX_WIDTH, tableCellConfig } from "../hooks"
import * as styles from "../styles"
import OperationCell from "./OperationCell"
import StyledTableCell from "./StyledTableCell"
import StyledTableRow from "./StyledTableRow"
import TableSkeleton from "./TableSkeleton"

const DataTableBody: FC<{
  finishInit: boolean
  certsList: Certs[]
  total: number
  onApplyCert: (id: number) => Promise<void>
  onEditItem: (cert: Certs) => void
}> = ({ finishInit, certsList, total, onApplyCert, onEditItem }) => {
  if (!finishInit) {
    return <TableSkeleton />
  }
  return (
    <TableBody>
      {total ? (
        certsList.map((cert) => (
          <StyledTableRow key={cert.id}>
            <StyledTableCell
              component="th"
              scope="row"
              sx={{ maxWidth: DOMAIN_ROW_MAX_WIDTH, overflow: "hidden" }}
            >
              <Tooltip title={cert.domain} placement="bottom-start">
                <p css={styles.domainCell}>{cert.domain}</p>
              </Tooltip>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="left">
              {cert.target}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              {cert.expire}
            </StyledTableCell>
            <StyledTableCell component="th" scope="row" align="center">
              {`${formatDateTime(cert.created_at * 1000, "yyyy-MM-dd")}`}
            </StyledTableCell>
            <OperationCell
              cert={cert}
              onApplyCert={onApplyCert}
              onEditItem={onEditItem}
            />
          </StyledTableRow>
        ))
      ) : (
        <TableRow>
          <StyledTableCell
            component="th"
            scope="row"
            align="center"
            colSpan={tableCellConfig.length}
          >
            No Data...
          </StyledTableCell>
        </TableRow>
      )}
    </TableBody>
  )
}

const DataTable: FC<{
  finishInit: boolean
  certsList: Certs[]
  total: number
  onApplyCert: (id: number) => Promise<void>
  onEditItem: (cert: Certs) => void
}> = ({ finishInit, certsList, total, onApplyCert, onEditItem }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            {tableCellConfig.map((cell) => (
              <StyledTableCell
                key={cell.name}
                align={cell.alignPosition}
                sx={cell.styles}
              >
                {cell.name}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <DataTableBody
          finishInit={finishInit}
          certsList={certsList}
          total={total}
          onApplyCert={onApplyCert}
          onEditItem={onEditItem}
        />
      </Table>
    </TableContainer>
  )
}

export default DataTable
