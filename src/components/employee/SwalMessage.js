import Swal from "sweetalert2";

export const showDeleteConfirmation = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: 'This action is irreversible!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete them!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
    });
};

export const deleteSelectedEmployees = async () => {
    try {
        const result = await showDeleteConfirmation();
        if (result.isConfirmed) {
            await Promise.all(selectedEmployees.map(async (id) => {
                await deleteEmployeeAction(id);
                setEmployees(employees => employees.filter(employee => employee.id !== id));
            }));
            setSelectedEmployees([]);
            Swal.fire('Deleted!', 'Employees have been deleted.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Cancelled', 'Employee deletion has been cancelled.', 'error');
        }
    } catch (error) {
        console.error('Failed to delete employees:', error);
        Swal.fire('Error!', 'Failed to delete employees.', 'error');
    }
};
