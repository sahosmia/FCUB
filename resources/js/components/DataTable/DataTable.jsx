import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import Pagination from "./Pagination";

/**
 * Reusable DataTable Component
 *
 * @param {Array} columns - [{ key: "title", label: "Title" }]
 * @param {Array} data - items to display
 * @param {Object} paginator - Laravel paginator object
 * @param {Function} onPageChange - handles pagination click
 * @param {Function} actions - returns JSX for row actions
 */

export default function DataTable({
  columns = [],
  data = [],
  paginator,
  onPageChange,
  actions,
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>

            {columns.map((col) => (
              <TableHead key={col.key}>{col.label}</TableHead>
            ))}

            {actions && <TableHead className="text-right w-40">Actions</TableHead>}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 2} className="text-center py-6">
                No data found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(paginator.from || 0) + index}</TableCell>

                {columns.map((col) => (
                  <TableCell key={col.key} className="max-w-md truncate">
                    {item[col.key]}
                  </TableCell>
                ))}

                {actions && (
                  <TableCell className="text-right">
                    {actions(item)}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
