import { beforeEach, describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import { toastError, toastSuccess } from './toast.helper';

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('toastSuccess', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.success with the provided message and options', () => {
    toastSuccess('Operation completed');

    expect(toast.success).toHaveBeenCalledWith('Operation completed', {
      position: 'top-center',
      action: {
        label: 'OK',
        onClick: expect.any(Function),
      },
    });
  });

  it('calls toast.success only once', () => {
    toastSuccess('Success');

    expect(toast.success).toHaveBeenCalledTimes(1);
  });
});

describe('toastError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.error with the provided message and options', () => {
    toastError('Something went wrong');

    expect(toast.error).toHaveBeenCalledWith('Something went wrong', {
      position: 'top-center',
      action: {
        label: 'OK',
        onClick: expect.any(Function),
      },
    });
  });

  it('calls toast.error only once', () => {
    toastError('Error');

    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});
